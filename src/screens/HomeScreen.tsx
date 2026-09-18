import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { useCanteen } from '../context/CanteenContext';
import { MENU_ITEMS } from '../data/canteenData';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { FoodCard } from '../components/FoodCard';
import { MealTimingsWidget } from '../components/MealTimingsWidget';

const TAJ_IMAGE_SOURCE = Platform.select({
  web: { uri: '/taj.png' },
  default: require('../../assets/taj.png'),
});

const getTimeBasedGreeting = (): string => {
  const hours = new Date().getHours();
  if (hours >= 4 && hours < 12) {
    return 'Good Morning,';
  } else if (hours >= 12 && hours < 17) {
    return 'Good Afternoon,';
  } else if (hours >= 17 && hours < 21) {
    return 'Good Evening,';
  } else {
    return 'Good Night,';
  }
};

export const HomeScreen: React.FC = () => {
  const { setActiveTab, activeCategory, searchQuery } = useCanteen();
  const [greeting, setGreeting] = React.useState<string>(getTimeBasedGreeting);

  React.useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getTimeBasedGreeting());
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter items based on active category & search query
  const filteredItems = MENU_ITEMS.filter((item) => {
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Hero Greeting Banner with Rashtrapati Bhavan / Taj Artwork */}
      <View style={styles.heroBanner}>
        {/* Left: Officer Greeting */}
        <View style={styles.heroGreeting}>
          <Text style={styles.greetingSub}>{greeting}</Text>
          <Text style={styles.officerTitle}>IAS Officer</Text>
          <Text style={styles.mottoSub}>Good food. Greater service.</Text>
        </View>

        {/* Far Right: Rashtrapati Bhavan Artwork from assets/taj.png touching the right side edge */}
        <View style={styles.backdropWrapper} pointerEvents="none">
          <Image
            source={require('../../assets/taj.png')}
            style={styles.tajBackdropImage}
            resizeMode="contain"
          />
        </View>

        {/* Right Slogan */}
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganText}>
            Nourishing{'\n'}People.{'\n'}Enabling{'\n'}Progress.
          </Text>
          <View style={styles.sloganUnderline} />
        </View>
      </View>

      {/* 2. Category Filter Pills */}
      <CategoryFilterBar />

      {/* 3. Main Body: Today's Menu Grid + Right Widgets */}
      <View style={styles.bodyLayout}>
        {/* Left Column: Menu Items */}
        <View style={styles.menuColumn}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Today's Menu</Text>
              <Text style={styles.sectionSubtitle}>
                Freshly prepared for a healthier, more productive day.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.viewFullMenuBtn}
              onPress={() => setActiveTab('menu')}
              activeOpacity={0.7}
            >
              <Text style={styles.viewFullMenuText}>View Full Menu</Text>
              <AppIcon name="arrow-forward" size={13} color="#0f172a" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          {/* Grid of Food Cards */}
          <View style={styles.foodGrid}>
            {filteredItems.slice(0, 8).map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <FoodCard item={item} />
              </View>
            ))}
          </View>
        </View>

        {/* Right Column: Widgets */}
        <View style={styles.widgetColumn}>
          <MealTimingsWidget />
        </View>
      </View>

      {/* 4. Bottom Footer */}
      <View style={styles.footerRow}>
        <Text style={styles.footerLeft}>
          Canteen Services | Government of India
        </Text>
        <Text style={styles.footerRight}>
          Healthy People. Efficient Governance. Stronger India.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    height: 195,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGreeting: {
    zIndex: 2,
    transform: [{ translateY: -12 }],
  },
  greetingSub: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  officerTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  mottoSub: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 2,
  },
  backdropWrapper: {
    position: 'absolute',
    right: 0,
    bottom: -22,
    height: 255,
    aspectRatio: 1945 / 724,
    zIndex: 1,
  },
  tajBackdropImage: {
    width: '100%',
    height: '100%',
    opacity: 0.82,
  },
  sloganContainer: {
    alignItems: 'flex-start',
    zIndex: 2,
    marginRight: 35,
    transform: [{ translateY: -22 }],
  },
  sloganText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 18,
  },
  sloganUnderline: {
    width: 36,
    height: 3,
    backgroundColor: '#ea580c',
    borderRadius: 2,
    marginTop: 6,
  },
  bodyLayout: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 20,
  },
  menuColumn: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  viewFullMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewFullMenuText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '23.4%',
    minWidth: 150,
  },
  widgetColumn: {
    alignItems: 'flex-start',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 10,
  },
  footerLeft: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  footerRight: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
