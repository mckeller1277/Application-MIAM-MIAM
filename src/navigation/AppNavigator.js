import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import FridgeScreen from '../screens/FridgeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import CartScreen from '../screens/CartScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Tab = createBottomTabNavigator();
const FridgeStack = createStackNavigator();
const RecipesStack = createStackNavigator();

function FridgeStackNav() {
  return (
    <FridgeStack.Navigator screenOptions={{ headerShown: false }}>
      <FridgeStack.Screen name="FridgeMain" component={FridgeScreen} />
      <FridgeStack.Screen name="Scanner" component={ScannerScreen} />
    </FridgeStack.Navigator>
  );
}

function RecipesStackNav() {
  return (
    <RecipesStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipesStack.Screen name="RecipesList" component={RecipesScreen} />
      <RecipesStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </RecipesStack.Navigator>
  );
}

const ICONS = {
  Frigo:    { active: '❄️', inactive: '🧊' },
  Recettes: { active: '🍽️', inactive: '🍴' },
  Courses:  { active: '🛒', inactive: '🛍️' },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#111E35',
            borderTopColor: 'rgba(255,255,255,0.08)',
            paddingBottom: 4,
            height: 60,
          },
          tabBarActiveTintColor: '#E8263A',
          tabBarInactiveTintColor: '#7A99BB',
          tabBarLabelStyle: { fontWeight: '700', fontSize: 10, marginBottom: 2 },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>
              {focused ? ICONS[route.name]?.active : ICONS[route.name]?.inactive}
            </Text>
          ),
        })}
      >
        <Tab.Screen name="Frigo" component={FridgeStackNav} />
        <Tab.Screen name="Recettes" component={RecipesStackNav} />
        <Tab.Screen name="Courses" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
