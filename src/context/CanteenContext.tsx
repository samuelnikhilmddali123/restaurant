import React, { createContext, useContext, useState, useMemo } from 'react';
import { ScreenTab, CategoryId, MenuItem, CartItem, PaymentMethod } from '../types';
import { MENU_ITEMS } from '../data/canteenData';

interface CanteenContextType {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  totalCartItems: number;
  cartSubtotal: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  orderStep: 1 | 2 | 3;
  setOrderStep: (step: 1 | 2 | 3) => void;
  placeOrder: () => void;
  isOrderSuccessModalOpen: boolean;
  setIsOrderSuccessModalOpen: (open: boolean) => void;
}

const CanteenContext = createContext<CanteenContextType | undefined>(undefined);

export const CanteenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart starts empty on app launch; items are only added when selected by the user
  const [cart, setCart] = useState<CartItem[]>([]);

  const [orderNote, setOrderNote] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [orderStep, setOrderStep] = useState<1 | 2 | 3>(1);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (itemId: string) => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalCartItems = useMemo(
    () => cart.reduce((acc, c) => acc + c.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0),
    [cart]
  );

  const placeOrder = () => {
    setIsOrderSuccessModalOpen(true);
    setOrderStep(3);
  };

  return (
    <CanteenContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalCartItems,
        cartSubtotal,
        orderNote,
        setOrderNote,
        paymentMethod,
        setPaymentMethod,
        orderStep,
        setOrderStep,
        placeOrder,
        isOrderSuccessModalOpen,
        setIsOrderSuccessModalOpen,
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export function useCanteen(): CanteenContextType {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
}
