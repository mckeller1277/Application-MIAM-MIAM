import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FridgeScreen from '../screens/FridgeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RecipesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipesList" component={RecipesScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#111E35',
            borderTopColor: 'rgba(255,255,255,0.08)',
          },
          tabBarActiveTintColor: '#E8263A',
          tabBarInactiveTintColor: '#7A99BB',
          tabBarLabelStyle: { fontWeight: '700', fontSize: 10 },
          tabBarIcon: ({ color, size }) => {
            const icons = { Frigo: 'kitchen', Recettes: 'restaurant', Courses: 'shopping-cart' };
            return <Icon name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Frigo" component={FridgeScreen} />
        <Tab.Screen name="Recettes" component={RecipesStack} />
        <Tab.Screen name="Courses" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
