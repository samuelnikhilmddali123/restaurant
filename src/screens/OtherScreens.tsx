import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { useCanteen } from '../context/CanteenContext';

export const ProfileScreen: React.FC = () => {
  const { setActiveTab } = useCanteen();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          }}
          style={styles.avatarLarge}
        />
        <Text style={styles.name}>IAS Officer</Text>
        <Text style={styles.role}>Cabinet Secretariat • Government of India</Text>
        <Text style={styles.idBadge}>Officer ID: GOI-DL-2026-8941</Text>

        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailVal}>officer.ias@nic.in</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Office Location</Text>
            <Text style={styles.detailVal}>North Block, Central Secretariat, New Delhi</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dietary Preference</Text>
            <Text style={styles.detailVal}>Vegetarian (South & North Indian)</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveTab('home')}>
          <AppIcon name="arrow-back" size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.backBtnText}>Back to Canteen Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SettingsScreen: React.FC = () => {
  const { setActiveTab } = useCanteen();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AppIcon name="settings-outline" size={36} color="#0d3829" style={{ marginBottom: 12 }} />
        <Text style={styles.name}>Canteen Preferences</Text>
        <Text style={styles.role}>Customize your canteen experience</Text>

        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orientation Lock</Text>
            <Text style={styles.detailVal}>Fixed Landscape (Active)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dietary Filters</Text>
            <Text style={styles.detailVal}>Show All / Highlight Healthy</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Version</Text>
            <Text style={styles.detailVal}>Expo SDK 57 • React 19</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveTab('home')}>
          <Text style={styles.backBtnText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HelpScreen: React.FC = () => {
  const { setActiveTab } = useCanteen();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AppIcon name="help-circle-outline" size={36} color="#0d3829" style={{ marginBottom: 12 }} />
        <Text style={styles.name}>Canteen Support & Feedback</Text>
        <Text style={styles.role}>Canteen Services Desk, Cabinet Secretariat</Text>

        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Helpline</Text>
            <Text style={styles.detailVal}>Ext. 4829 / +91 11 2309 0000</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Operating Hours</Text>
            <Text style={styles.detailVal}>7:00 AM – 9:30 PM (All Days)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Meal Collection</Text>
            <Text style={styles.detailVal}>Counter 1 (Beverages), Counter 2 (Meals)</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveTab('home')}>
          <Text style={styles.backBtnText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 28,
    maxWidth: 520,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  role: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  idBadge: {
    backgroundColor: '#eef7f2',
    color: '#0d3829',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 16,
  },
  detailsList: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 14,
    gap: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d3829',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
