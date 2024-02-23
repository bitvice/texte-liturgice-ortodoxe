import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from './SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ParticulareScreen } from './ParticulareScreen';
import { BisericestiScreen } from './BisericestiScreen';
import { ContentScreen } from './ContentScreen';

const Stack = createStackNavigator();

export function ScreensRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">

        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
          />

        <Stack.Screen
          name="particulare"
          component={ParticulareScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="bisericesti"
          component={BisericestiScreen}
          options={{
            headerShown: false,
          }}
          />
        

        <Stack.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
          />

        <Stack.Screen
          name="content"
          component={ContentScreen}
          options={{
            headerShown: false,
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>    
  );
}