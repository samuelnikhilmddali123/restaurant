export type ScreenTab = 'home' | 'menu' | 'orders' | 'profile' | 'settings' | 'help';

export type CategoryId =
  | 'all'
  | 'breakfast'
  | 'lunch'
  | 'snacks'
  | 'beverages'
  | 'healthy'
  | 'south-indian'
  | 'north-indian';

export interface Category {
  id: CategoryId;
  label: string;
  iconName: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  category: CategoryId;
  subCategory?: string;
  image: string;
  rating?: number;
  portion?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type PaymentMethod = 'online' | 'cod';

export interface MealTiming {
  name: string;
  hours: string;
  icon: string;
  isActive?: boolean;
}
