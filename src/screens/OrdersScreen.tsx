import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { useCanteen } from '../context/CanteenContext';

export const OrdersScreen: React.FC = () => {
  const {
    cart,
    totalCartItems,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderNote,
    setOrderNote,
    paymentMethod,
    setPaymentMethod,
    orderStep,
    setOrderStep,
    placeOrder,
    isOrderSuccessModalOpen,
    setIsOrderSuccessModalOpen,
    setActiveTab,
  } = useCanteen();

  const handleOrderDone = () => {
    setIsOrderSuccessModalOpen(false);
    clearCart();
    setOrderStep(1);
    setActiveTab('home');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Stepper Bar (1. Your Order -> 2. Payment -> 3. Confirmation) */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, orderStep >= 1 && styles.stepCircleActive]}>
            <Text style={[styles.stepNumber, orderStep >= 1 && styles.stepNumberActive]}>1</Text>
          </View>
          <Text style={[styles.stepLabel, orderStep >= 1 && styles.stepLabelActive]}>
            Your Order
          </Text>
        </View>

        <View style={[styles.stepConnector, orderStep >= 2 && styles.stepConnectorActive]} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, orderStep >= 2 && styles.stepCircleActive]}>
            <Text style={[styles.stepNumber, orderStep >= 2 && styles.stepNumberActive]}>2</Text>
          </View>
          <Text style={[styles.stepLabel, orderStep >= 2 && styles.stepLabelActive]}>
            Payment
          </Text>
        </View>

        <View style={[styles.stepConnector, orderStep >= 3 && styles.stepConnectorActive]} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, orderStep >= 3 && styles.stepCircleActive]}>
            <Text style={[styles.stepNumber, orderStep >= 3 && styles.stepNumberActive]}>3</Text>
          </View>
          <Text style={[styles.stepLabel, orderStep >= 3 && styles.stepLabelActive]}>
            Confirmation
          </Text>
        </View>
      </View>

      {/* 2. Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Your Order</Text>
        <Text style={styles.pageSubtitle}>Review your items and proceed to payment</Text>
      </View>

      {/* 3. Main Order Columns */}
      <View style={styles.mainColumns}>
        {/* Left Column: Expanded Cart Items & Special Instructions */}
        <View style={styles.leftColumn}>
          <View style={styles.cartCard}>
            <View style={styles.cartCardHeader}>
              <View style={styles.titleRow}>
                <AppIcon name="cart-outline" size={17} color="#0f172a" style={{ marginRight: 6 }} />
                <Text style={styles.cartTitle}>
                  Your Cart <Text style={styles.cartItemCount}>({totalCartItems} items)</Text>
                </Text>
              </View>

              {cart.length > 0 && (
                <TouchableOpacity onPress={clearCart} style={styles.clearBtn} activeOpacity={0.7}>
                  <AppIcon name="trash-outline" size={14} color="#64748b" style={{ marginRight: 4 }} />
                  <Text style={styles.clearBtnText}>Clear Cart</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* List of Cart Items */}
            <View style={styles.itemsList}>
              {cart.length === 0 ? (
                <View style={styles.emptyCartBox}>
                  <AppIcon name="fast-food-outline" size={32} color="#cbd5e1" />
                  <Text style={styles.emptyCartTitle}>No items in order</Text>
                  <TouchableOpacity
                    style={styles.browseMenuBtn}
                    onPress={() => setActiveTab('menu')}
                  >
                    <Text style={styles.browseMenuBtnText}>Browse Menu</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                cart.map((c) => (
                  <View key={c.item.id} style={styles.cartItemRow}>
                    <Image source={{ uri: c.item.image }} style={styles.itemThumb} />

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{c.item.name}</Text>
                      <View style={styles.tagRow}>
                        <View style={styles.vegDot} />
                        <Text style={styles.tagText}>{c.item.subCategory || c.item.category}</Text>
                      </View>
                    </View>

                    <Text style={styles.itemPrice}>₹{c.item.price * c.quantity}</Text>

                    {/* Stepper */}
                    <View style={styles.stepper}>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(c.item.id, -1)}
                      >
                        <Text style={styles.stepBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{c.quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(c.item.id, 1)}
                      >
                        <Text style={styles.stepBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Trash Delete */}
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => removeFromCart(c.item.id)}
                    >
                      <AppIcon name="trash-outline" size={15} color="#94a3b8" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            {/* Add a Note (Optional) */}
            <View style={styles.noteSection}>
              <View style={styles.noteHeader}>
                <AppIcon name="document-text-outline" size={15} color="#475569" style={{ marginRight: 6 }} />
                <Text style={styles.noteTitle}>Add a Note (Optional)</Text>
              </View>
              <TextInput
                style={styles.noteInput}
                placeholder="e.g. Less spicy, no onion, extra chutney..."
                placeholderTextColor="#94a3b8"
                maxLength={100}
                value={orderNote}
                onChangeText={setOrderNote}
              />
              <Text style={styles.noteCounter}>{orderNote.length}/100</Text>
            </View>
          </View>

          {/* Productivity Banner */}
          <View style={styles.bannerCard}>
            <View style={styles.bannerIconBox}>
              <AppIcon name="leaf" size={18} color="#15803d" />
            </View>
            <View style={styles.bannerTextBox}>
              <Text style={styles.bannerTitle}>Good Food. Greater Productivity.</Text>
              <Text style={styles.bannerSub}>
                Nutritious meals for a healthier, stronger India.
              </Text>
            </View>
          </View>
        </View>

        {/* Right Column: Order Summary & Payment Method */}
        <View style={styles.rightColumn}>
          {/* Order Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <AppIcon name="receipt-outline" size={16} color="#0f172a" style={{ marginRight: 6 }} />
              <Text style={styles.summaryTitle}>Order Summary</Text>
            </View>

            <View style={styles.summaryLines}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items ({totalCartItems})</Text>
                <Text style={styles.summaryValue}>₹{cartSubtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Charge</Text>
                <Text style={styles.summaryValue}>₹0</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{cartSubtotal}</Text>
              </View>
            </View>
          </View>

          {/* Select Payment Method */}
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <AppIcon name="card-outline" size={16} color="#0f172a" style={{ marginRight: 6 }} />
              <Text style={styles.paymentTitle}>Select Payment Method</Text>
            </View>

            <View style={styles.paymentOptions}>
              {/* Option 1: Online */}
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'online' && styles.paymentOptionActive,
                ]}
                onPress={() => setPaymentMethod('online')}
                activeOpacity={0.8}
              >
                <View style={styles.radioOuter}>
                  {paymentMethod === 'online' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.methodIconBox}>
                  <AppIcon name="card" size={16} color="#0e382b" />
                </View>
                <View style={styles.methodTextBox}>
                  <Text style={styles.methodTitle}>Online Payment</Text>
                  <Text style={styles.methodSub}>
                    UPI, Debit Card, Credit Card, Net Banking
                  </Text>
                </View>
                <AppIcon name="chevron-forward" size={15} color="#94a3b8" />
              </TouchableOpacity>

              {/* Option 2: Cash on Delivery */}
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'cod' && styles.paymentOptionActive,
                ]}
                onPress={() => setPaymentMethod('cod')}
                activeOpacity={0.8}
              >
                <View style={styles.radioOuter}>
                  {paymentMethod === 'cod' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.methodIconBox}>
                  <AppIcon name="cash-outline" size={16} color="#0e382b" />
                </View>
                <View style={styles.methodTextBox}>
                  <Text style={styles.methodTitle}>Cash on Delivery</Text>
                  <Text style={styles.methodSub}>
                    Pay at counter while collecting food
                  </Text>
                </View>
                <AppIcon name="chevron-forward" size={15} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Place Order Button */}
          <TouchableOpacity
            style={[styles.placeOrderBtn, cart.length === 0 && styles.placeOrderBtnDisabled]}
            disabled={cart.length === 0}
            onPress={placeOrder}
            activeOpacity={0.85}
          >
            <Text style={styles.placeOrderBtnText}>Place Order</Text>
            <AppIcon name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <Text style={styles.disclaimerText}>
            By placing the order, you agree to the canteen{' '}
            <Text style={styles.disclaimerLink}>terms and conditions</Text>.
          </Text>
        </View>
      </View>

      {/* Order Success Modal */}
      <Modal
        visible={isOrderSuccessModalOpen}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconCircle}>
              <AppIcon name="checkmark-circle" size={48} color="#15803d" />
            </View>
            <Text style={styles.modalTitle}>Order Placed Successfully!</Text>
            <Text style={styles.tokenBadge}>Token: #CS-8429</Text>
            <Text style={styles.modalMessage}>
              Your order has been submitted to the Canteen Kitchen.{'\n'}
              Estimated prep time: <Text style={{ fontWeight: '700' }}>10-15 mins</Text>
            </Text>
            <View style={styles.modalDetailsBox}>
              <Text style={styles.modalDetailLine}>
                Total Paid: <Text style={{ fontWeight: '700' }}>₹{cartSubtotal}</Text>
              </Text>
              <Text style={styles.modalDetailLine}>
                Method: <Text style={{ fontWeight: '700' }}>{paymentMethod === 'online' ? 'UPI / Online' : 'Cash at Counter'}</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.modalDoneBtn} onPress={handleOrderDone}>
              <Text style={styles.modalDoneBtnText}>Done & Return Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#0d3829',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  stepLabelActive: {
    color: '#0d3829',
    fontWeight: '700',
  },
  stepConnector: {
    width: 48,
    height: 2,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  stepConnectorActive: {
    backgroundColor: '#0d3829',
  },
  pageHeader: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  mainColumns: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    flex: 1.15,
  },
  rightColumn: {
    flex: 0.85,
  },
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 14,
  },
  cartCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  cartItemCount: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  itemsList: {
    paddingVertical: 8,
  },
  emptyCartBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyCartTitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
    marginBottom: 10,
  },
  browseMenuBtn: {
    backgroundColor: '#0d3829',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  browseMenuBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 4,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  tagText: {
    fontSize: 10,
    color: '#64748b',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginRight: 16,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 4,
    height: 28,
    marginRight: 12,
  },
  stepBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 8,
  },
  deleteBtn: {
    padding: 6,
  },
  noteSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    position: 'relative',
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  noteInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#0f172a',
    outlineStyle: 'none' as any,
  },
  noteCounter: {
    position: 'absolute',
    right: 12,
    bottom: 8,
    fontSize: 10,
    color: '#94a3b8',
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 12,
  },
  bannerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextBox: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  bannerSub: {
    fontSize: 11,
    color: '#15803d',
    marginTop: 1,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 14,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  summaryLines: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  paymentOptions: {
    gap: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  paymentOptionActive: {
    borderColor: '#0d3829',
    backgroundColor: '#f8fafc',
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0d3829',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0d3829',
  },
  methodIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#eef7f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  methodTextBox: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  methodSub: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 1,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d3829',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeOrderBtnDisabled: {
    opacity: 0.5,
  },
  placeOrderBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  disclaimerText: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 14,
  },
  disclaimerLink: {
    color: '#15803d',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 28,
    maxWidth: 420,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  successIconCircle: {
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  tokenBadge: {
    backgroundColor: '#eef7f2',
    color: '#0d3829',
    fontSize: 14,
    fontWeight: '800',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  modalDetailsBox: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    gap: 4,
  },
  modalDetailLine: {
    fontSize: 12,
    color: '#334155',
  },
  modalDoneBtn: {
    backgroundColor: '#0d3829',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalDoneBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
