import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { useCanteen } from '../context/CanteenContext';
import { MENU_ITEMS } from '../data/canteenData';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { FoodCard } from '../components/FoodCard';
import { CartSidebar } from '../components/CartSidebar';

const SERIF_FONT = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  web: "Georgia, 'Playfair Display', 'Times New Roman', serif",
  default: 'Georgia',
});

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
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      {/* 1. Hero Menu Banner (with Taj Backdrop & Slogan just like Home page) */}
      <View style={styles.heroBanner}>
        {/* Left: Menu Title & Subtitle */}
        <View style={styles.heroMenuText}>
          <Text style={styles.pageTitle}>Menu</Text>
          <View style={styles.titleAccentLine} />
          <Text style={styles.pageSubtitle}>
            Freshly prepared  |  Hygienic  |  Nutrition focused
          </Text>
        </View>

        {/* Far Right: Rashtrapati Bhavan Artwork from assets/taj.png touching the right side edge */}
        <View style={styles.backdropWrapper} pointerEvents="none">
          <Image
            source={require('../../assets/taj.png')}
            style={styles.tajBackdropImage}
            resizeMode="contain"
          />
        </View>

        {/* Right Slogan with Vertical Line & Two-Tone Orange/Green Accent Line */}
        <View style={styles.sloganWrapper}>
          <View style={styles.sloganRow}>
            {/* Left Vertical Line */}
            <View style={styles.sloganVerticalLine} />

            {/* Slogan Text */}
            <Text style={styles.sloganText}>
              Nourishing{'\n'}People.{'\n'}Enabling{'\n'}Progress.
            </Text>
          </View>

          {/* Bottom Two-Tone Accent Line: Orange (left) & Green (right) */}
          <View style={styles.twoToneAccentLine}>
            <View style={styles.orangeLineSegment} />
            <View style={styles.greenLineSegment} />
          </View>
        </View>
      </View>

      {/* 2. Category Filter Pills */}
      <CategoryFilterBar />

      {/* 3. Main Body: Menu Sections on Left + Sticky Cart Sidebar on Right */}
      <View style={styles.mainLayout}>
        {/* Left Scrollable Menu Categories */}
        <View style={styles.menuContentArea}>
          {/* Section 1: Breakfast */}
          {visibleBreakfast.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Breakfast{' '}
                  <Text style={styles.sectionCount}>({visibleBreakfast.length} items)</Text>
                </Text>
                <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
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
                <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
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
                <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
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
        </View>

        {/* Right Sticky Cart Sidebar */}
        <View style={styles.cartColumn}>
          <CartSidebar />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 0,
    height: 180,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  heroMenuText: {
    zIndex: 2,
    transform: [{ translateY: -10 }],
  },
  pageTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: SERIF_FONT,
    letterSpacing: -0.6,
    lineHeight: 48,
  },
  titleAccentLine: {
    width: 38,
    height: 3,
    backgroundColor: '#0e4d36',
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  backdropWrapper: {
    position: 'absolute',
    right: 0,
    bottom: -20,
    height: 240,
    aspectRatio: 1945 / 724,
    zIndex: 1,
  },
  tajBackdropImage: {
    width: '100%',
    height: '100%',
    opacity: 0.82,
  },
  sloganWrapper: {
    alignItems: 'flex-start',
    zIndex: 2,
    marginRight: 35,
    transform: [{ translateY: -30 }],
  },
  sloganRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sloganVerticalLine: {
    width: 2.5,
    backgroundColor: '#0e4d36',
    borderRadius: 1.5,
    marginRight: 10,
  },
  sloganText: {
    fontSize: 15.5,
    fontWeight: '500',
    color: '#0f172a',
    fontFamily: SERIF_FONT,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  twoToneAccentLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 12.5,
    height: 3,
  },
  orangeLineSegment: {
    width: 26,
    height: 3,
    backgroundColor: '#ea580c',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  greenLineSegment: {
    width: 26,
    height: 3,
    backgroundColor: '#0e4d36',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  mainLayout: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 20,
    alignItems: 'flex-start',
  },
  menuContentArea: {
    flex: 1,
  },
  cartColumn: {
    width: 310,
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    width: 128,
    flexGrow: 1,
    maxWidth: 160,
  },
});
