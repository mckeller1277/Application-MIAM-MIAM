import AsyncStorage from '@react-native-async-storage/async-storage';

const FRIDGE_KEY = '@miam_miam_fridge';
const CART_KEY   = '@miam_miam_cart';

export async function saveFridge(ingredients) {
  await AsyncStorage.setItem(FRIDGE_KEY, JSON.stringify(ingredients));
}

export async function loadFridge() {
  const data = await AsyncStorage.getItem(FRIDGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveCart(items) {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
}

export async function loadCart() {
  const data = await AsyncStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}
