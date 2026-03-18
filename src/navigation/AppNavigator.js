import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { isTablet } from '../utils/responsive';

import FridgeScreen from '../screens/FridgeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import CartScreen from '../screens/CartScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
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

function DrawerLabel({ label, focused }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22 }}>
        {focused ? ICONS[label]?.active : ICONS[label]?.inactive}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: '700', color: focused ? '#E8263A' : '#7A99BB' }}>
        {label}
      </Text>
    </View>
  );
}

function TabletNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#111E35', width: 240 },
        drawerType: 'permanent',
        drawerActiveTintColor: '#E8263A',
        drawerInactiveTintColor: '#7A99BB',
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen
        name="Frigo"
        component={FridgeStackNav}
        options={{ drawerLabel: ({ focused }) => <DrawerLabel label="Frigo" focused={focused} /> }}
      />
      <Drawer.Screen
        name="Recettes"
        component={RecipesStackNav}
        options={{ drawerLabel: ({ focused }) => <DrawerLabel label="Recettes" focused={focused} /> }}
      />
      <Drawer.Screen
        name="Courses"
        component={CartScreen}
        options={{ drawerLabel: ({ focused }) => <DrawerLabel label="Courses" focused={focused} /> }}
      />
    </Drawer.Navigator>
  );
}

function PhoneNavigator() {
  return (
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
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {isTablet ? <TabletNavigator /> : <PhoneNavigator />}
    </NavigationContainer>
  );
}
