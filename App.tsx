import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { FeedbackProvider } from './src/components/feedback/FeedbackProvider';
import { useAppFonts } from './src/theme/useAppFonts';
import { useAppStore } from './src/store/useAppStore';
import { color } from './src/theme/tokens';
import { View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useAppFonts();
  const tick = useAppStore(st => st.tick);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: color.bg }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FeedbackProvider>
          <RootNavigator />
        </FeedbackProvider>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
