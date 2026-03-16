import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { loadCart, saveCart } from '../utils/storage';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

export default function CartScreen() {
  const [cart, setCart] = useState([]);
  useFocusEffect(useCallback(() => { loadCart().then(setCart); }, []));

  const toggle = async (idx) => {
    const updated = cart.map((c, i) => i === idx ? { ...c, done: !c.done } : c);
    setCart(updated);
    await saveCart(updated);
  };

  const clearDone = () => Alert.alert('Effacer', 'Supprimer les articles cochés ?', [
    { text: 'Annuler', style: 'cancel' },
    { text: 'Effacer', style: 'destructive', onPress: async () => {
      const updated = cart.filter(c => !c.done);
      setCart(updated);
      await saveCart(updated);
    }},
  ]);

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <View>
          <Text style={s.title}>Liste de courses</Text>
          {cart.length > 0 && <Text style={s.sub}>{cart.filter(c => c.done).length}/{cart.length} cochés</Text>}
        </View>
        {cart.some(c => c.done) && (
          <TouchableOpacity onPress={clearDone} style={s.clearBtn}>
            <Text style={s.clearText}>Effacer cochés</Text>
          </TouchableOpacity>
        )}
      </View>
      {!cart.length ? (
        <View style={s.empty}>
          <Text style={{ fontSize: 48 }}>🛒</Text>
          <Text style={s.emptyText}>Votre liste est vide.{'\n'}Choisissez une recette pour la remplir !</Text>
        </View>
      ) : (
        <FlatList
          data={cart} keyExtractor={(_, i) => String(i)} contentContainerStyle={{ padding: 14 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={s.item} onPress={() => toggle(index)}>
              <View style={[s.box, item.done && s.boxDone]}>
                {item.done && <Text style={{ color: C.white, fontSize: 12, fontWeight: '800' }}>✓</Text>}
              </View>
              <Text style={[s.label, item.done && s.labelDone]}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.bg2, padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { color: C.white, fontSize: 18, fontWeight: '800' },
  sub: { color: C.muted, fontSize: 11, marginTop: 2 },
  clearBtn: { backgroundColor: C.bg3, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: C.redDark },
  clearText: { color: C.red, fontSize: 12, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { color: C.muted, fontSize: 13, textAlign: 'center', lineHeight: 20 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.bg2, borderRadius: 14, borderWidth: 1.5, borderColor: C.border, padding: 12, marginBottom: 8 },
  box: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: C.skyLight, alignItems: 'center', justifyContent: 'center' },
  boxDone: { backgroundColor: C.red, borderColor: C.redDark },
  label: { color: C.text, fontSize: 13, fontWeight: '600', flex: 1 },
  labelDone: { textDecorationLine: 'line-through', color: C.muted },
});
