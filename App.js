import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import Routes from './app/routes/Routes';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <StatusBar style="auto" />
    </View>
  );
}