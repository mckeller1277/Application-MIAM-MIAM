import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveCart, loadCart } from '../utils/storage';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D', redGlow: 'rgba(232,38,58,0.18)',
  skyMid: '#5294C4', text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  const addToCart = async () => {
    const current = await loadCart();
    const newItems = recipe.ingredients.map(i => ({
      label: `${i.name} — ${i.measure}`,
      done: false,
    }));
    await saveCart([...current, ...newItems.filter(n => !current.find(c => c.label === n.label))]);
    navigation.navigate('Courses');
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.backBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Retour</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={s.hero}>
          <Text style={s.heroEmoji}>{recipe.emoji}</Text>
          <Text style={s.heroTitle}>{recipe.title}</Text>
          <View style={s.heroTags}>
            <View style={s.dtag}><Text style={s.dtagText}>⏱ {recipe.time} min</Text></View>
            <View style={s.dtag}><Text style={s.dtagText}>{recipe.difficulty}</Text></View>
            <View style={s.dtag}><Text style={s.dtagText}>{recipe.category}</Text></View>
          </View>
        </View>

        <Text style={s.sec}>Ingrédients</Text>
        {recipe.ingredients.map((item, i) => (
          <View key={i} style={s.ingrRow}>
            <View style={s.dot} />
            <Text style={s.ingrName}>{item.name}</Text>
            <Text style={s.ingrQty}>{item.measure}</Text>
          </View>
        ))}

        <Text style={s.sec}>Préparation</Text>
        {recipe.steps.map((step, i) => (
          <View key={i} style={s.stepRow}>
            <View style={s.stepNum}><Text style={s.stepNumText}>{i + 1}</Text></View>
            <Text style={s.stepText}>{step}</Text>
          </View>
        ))}

        <TouchableOpacity style={s.cta} onPress={addToCart}>
          <Text style={s.ctaText}>+ Ajouter à ma liste de courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  backBar: { backgroundColor: C.bg2, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  backText: { color: C.skyMid, fontSize: 14, fontWeight: '700' },
  hero: { backgroundColor: C.bg2, padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.border },
  heroEmoji: { fontSize: 60, marginBottom: 10 },
  heroTitle: { color: C.text, fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  heroTags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  dtag: { backgroundColor: C.bg3, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: C.border },
  dtagText: { color: C.muted, fontSize: 11, fontWeight: '600' },
  sec: { color: C.skyMid, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', padding: 14, paddingBottom: 6 },
  ingrRow: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: C.border },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.red, marginRight: 10 },
  ingrName: { color: C.text, fontWeight: '600', fontSize: 13, flex: 1 },
  ingrQty: { color: C.muted, fontSize: 12 },
  stepRow: { flexDirection: 'row', gap: 10, padding: 10, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: C.border, alignItems: 'flex-start' },
  stepNum: { minWidth: 24, height: 24, borderRadius: 8, backgroundColor: C.redGlow, borderWidth: 1, borderColor: C.redDark, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: C.red, fontSize: 11, fontWeight: '800' },
  stepText: { flex: 1, color: C.text, fontSize: 13, lineHeight: 20 },
  cta: { margin: 18, backgroundColor: C.red, borderRadius: 22, padding: 14, alignItems: 'center' },
  ctaText: { color: C.white, fontSize: 14, fontWeight: '700' },
});
