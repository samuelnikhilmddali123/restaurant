import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { useCanteen } from '../context/CanteenContext';
import { MENU_ITEMS } from '../data/canteenData';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { FoodCard } from '../components/FoodCard';
import { CartSidebar } from '../components/CartSidebar';

export const MenuScreen: React.FC = () => {
  const { activeCategory, searchQuery } = useCanteen();

  const breakfastItems = MENU_ITEMS.filter((i) => i.category === 'breakfast');
  const lunchItems = MENU_ITEMS.filter((i) => i.category === 'lunch');
  const snackItems = MENU_ITEMS.filter((i) => i.category === 'snacks');

  const applyFilters = (items: typeof MENU_ITEMS) => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        item.category === activeCategory ||
        (activeCategory === 'south-indian' && item.subCategory === 'South Indian') ||
        (activeCategory === 'north-indian' && item.subCategory === 'North Indian') ||
        (activeCategory === 'healthy' && item.subCategory === 'Healthy');

      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  };

  const visibleBreakfast = applyFilters(breakfastItems);
  const visibleLunch = applyFilters(lunchItems);
  const visibleSnacks = applyFilters(snackItems);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainLayout}>
        {/* Left Scrollable Menu Section */}
        <ScrollView style={styles.menuScrollArea} showsVerticalScrollIndicator={false}>
          {/* Header Title */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>Menu</Text>
            <Text style={styles.pageSubtitle}>
              Freshly prepared | Hygienic | Nutrition focused
            </Text>
          </View>

          {/* Category Chips */}
          <CategoryFilterBar />

          {/* Section 1: Breakfast */}
          {visibleBreakfast.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Breakfast{' '}
                  <Text style={styles.sectionCount}>({visibleBreakfast.length} items)</Text>
                </Text>
                <TouchableOpacity style={styles.seeAllBtn}>
                  <Text style={styles.seeAllText}>See All</Text>
                  <AppIcon name="arrow-forward" size={13} color="#0f172a" />
                </TouchableOpacity>
              </View>

              <View style={styles.foodRow}>
                {visibleBreakfast.map((item) => (
                  <View key={item.id} style={styles.cardWrapper}>
                    <FoodCard item={item} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Section 2: Lunch */}
          {visibleLunch.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Lunch{' '}
                  <Text style={styles.sectionCount}>({visibleLunch.length} items)</Text>
                </Text>
                <TouchableOpacity style={styles.seeAllBtn}>
                  <Text style={styles.seeAllText}>See All</Text>
                  <AppIcon name="arrow-forward" size={13} color="#0f172a" />
                </TouchableOpacity>
              </View>

              <View style={styles.foodRow}>
                {visibleLunch.map((item) => (
                  <View key={item.id} style={styles.cardWrapper}>
                    <FoodCard item={item} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Section 3: Snacks */}
          {visibleSnacks.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Snacks{' '}
                  <Text style={styles.sectionCount}>({visibleSnacks.length} items)</Text>
                </Text>
                <TouchableOpacity style={styles.seeAllBtn}>
                  <Text style={styles.seeAllText}>See All</Text>
                  <AppIcon name="arrow-forward" size={13} color="#0f172a" />
                </TouchableOpacity>
              </View>

              <View style={styles.foodRow}>
                {visibleSnacks.map((item) => (
                  <View key={item.id} style={styles.cardWrapper}>
                    <FoodCard item={item} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Right Sticky Cart Sidebar */}
        <View style={styles.cartColumn}>
          <CartSidebar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 18,
  },
  menuScrollArea: {
    flex: 1,
  },
  titleSection: {
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  pageSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  categorySection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
  },
  foodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cardWrapper: {
    width: '31.8%',
    minWidth: 145,
  },
  cartColumn: {
    height: '100%',
  },
});
