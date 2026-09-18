import React from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useLandscapeOrientation } from './src/hooks/useLandscapeOrientation';
import { PortraitPrompt } from './src/components/PortraitPrompt';
import { CanteenProvider, useCanteen } from './src/context/CanteenContext';
import { Sidebar } from './src/components/Sidebar';
import { Header } from './src/components/Header';
import { HomeScreen } from './src/screens/HomeScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { ProfileScreen, SettingsScreen, HelpScreen } from './src/screens/OtherScreens';

function MainLandscapeApp(): React.JSX.Element {
  const { activeTab } = useCanteen();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'help':
        return <HelpScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appShell}>
      {/* Left Dark Forest Green Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <Header />
        <View style={styles.screenContainer}>{renderActiveScreen()}</View>
      </View>
    </View>
  );
}

export default function App(): React.JSX.Element {
  const { isPortrait, requestFullscreenLandscape } = useLandscapeOrientation();

  return (
    <CanteenProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        {/* If viewport is currently in portrait on web, prompt to rotate to landscape */}
        {isPortrait && Platform.OS === 'web' ? (
          <PortraitPrompt onRequestFullscreen={requestFullscreenLandscape} />
        ) : (
          <MainLandscapeApp />
        )}
      </SafeAreaView>
    </CanteenProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appShell: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
