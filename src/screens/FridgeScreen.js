import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveFridge, loadFridge } from '../utils/storage';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D',
  skyMid: '#5294C4', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

const DEFAULT_INGREDIENTS = ['Oeufs', 'Tomates', 'Fromage', 'Carottes', 'Beurre', 'Lait', 'Pommes de terre'];

export default function FridgeScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadFridge().then(data => {
      const list = data.length ? data : DEFAULT_INGREDIENTS;
      setIngredients(list);
      if (!data.length) saveFridge(list);
    });
  }, []);

  const addIngredient = () => {
    const val = input.trim();
    if (!val) return;
    if (ingredients.map(x => x.toLowerCase()).includes(val.toLowerCase())) return;
    const cap = val.charAt(0).toUpperCase() + val.slice(1);
    const newList = [...ingredients, cap];
    setIngredients(newList);
    saveFridge(newList);
    setInput('');
  };

  const removeIngredient = (item) => {
    Alert.alert('Supprimer', `Retirer "${item}" du frigo ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => {
        const newList = ingredients.filter(x => x !== item);
        setIngredients(newList);
        saveFridge(newList);
      }},
    ]);
  };

  const goToRecipes = () => {
    if (!ingredients.length) {
      Alert.alert('Frigo vide', 'Ajoutez des ingrédients !');
      return;
    }
    navigation.navigate('Recettes', {
      selectedIngredients: ingredients.map(x => x.toLowerCase()),
    });
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.logo}>🍴 Miam Miam</Text>
        <Text style={s.sub}>Cuisinez avec ce que vous avez</Text>
      </View>
      <Text style={s.sec}>Mon frigo</Text>
      <Text style={s.hint}>Appui long pour supprimer un ingrédient</Text>
      <FlatList
        data={ingredients}
        keyExtractor={item => item}
        numColumns={3}
        contentContainerStyle={s.chipGrid}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.chip} onLongPress={() => removeIngredient(item)}>
            <Text style={s.chipText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={s.addRow}>
        <TextInput
          style={s.input} value={input} onChangeText={setInput}
          placeholder="Ajouter un ingrédient..." placeholderTextColor={C.muted}
          onSubmitEditing={addIngredient} returnKeyType="done"
        />
        <TouchableOpacity style={s.btnPlus} onPress={addIngredient}>
          <Text style={s.btnPlusText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={s.scanBox} onPress={() => navigation.navigate('Scanner')}>
        <View style={s.scanIcon}><Text style={{ fontSize: 20 }}>▣</Text></View>
        <View>
          <Text style={s.scanTitle}>Scanner un code-barres</Text>
          <Text style={s.scanSub}>Ajouter un produit instantanément</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={s.cta} onPress={goToRecipes}>
        <Text style={s.ctaText}>🔍 Trouver des recettes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.bg2, padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  logo: { color: C.white, fontSize: 20, fontWeight: '800' },
  sub: { color: C.muted, fontSize: 11, marginTop: 2 },
  sec: { color: C.skyMid, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', padding: 14, paddingBottom: 2 },
  hint: { color: C.muted, fontSize: 10, paddingHorizontal: 14, paddingBottom: 6 },
  chipGrid: { paddingHorizontal: 12, paddingBottom: 8 },
  chip: { margin: 4, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 22, backgroundColor: C.red, borderWidth: 1.5, borderColor: C.redDark },
  chipText: { color: C.white, fontSize: 12, fontWeight: '700' },
  addRow: { flexDirection: 'row', padding: 14, gap: 8, alignItems: 'center' },
  input: { flex: 1, backgroundColor: C.bg3, borderRadius: 22, borderWidth: 1.5, borderColor: C.skyLight, padding: 8, paddingHorizontal: 14, color: C.text, fontSize: 13 },
  btnPlus: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' },
  btnPlusText: { color: C.white, fontSize: 22, lineHeight: 26 },
  scanBox: { flexDirection: 'row', alignItems: 'center', gap: 14, margin: 14, marginTop: 0, backgroundColor: C.bg3, borderRadius: 16, borderWidth: 1.5, borderColor: C.skyLight, borderStyle: 'dashed', padding: 14 },
  scanIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: C.skyLight, alignItems: 'center', justifyContent: 'center' },
  scanTitle: { color: C.text, fontSize: 13, fontWeight: '700' },
  scanSub: { color: C.muted, fontSize: 11, marginTop: 2 },
  cta: { margin: 14, marginTop: 4, backgroundColor: C.red, borderRadius: 22, padding: 14, alignItems: 'center' },
  ctaText: { color: C.white, fontSize: 15, fontWeight: '700' },
});
