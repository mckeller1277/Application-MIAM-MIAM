import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { saveCart, loadCart } from '../utils/storage';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D', redGlow: 'rgba(232,38,58,0.18)',
  skyMid: '#5294C4', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

const MOCK = {
  '1': {
    ingrs: [{ n: 'Oeufs', q: '3 pcs' }, { n: 'Champignons', q: '100 g' }, { n: 'Beurre', q: '10 g' }, { n: 'Sel & poivre', q: '' }],
    steps: ['Nettoyer et émincer les champignons.', 'Faire revenir dans le beurre 3 min.', 'Battre les oeufs, assaisonner.', 'Verser sur les champignons, cuire à feu moyen.', 'Plier et servir chaud.'],
  },
  '2': {
    ingrs: [{ n: 'Pâtes', q: '200 g' }, { n: 'Tomates', q: '3 pcs' }, { n: 'Ail', q: '2 gousses' }, { n: 'Huile d\'olive', q: '2 c.s.' }, { n: 'Basilic', q: 'quelques feuilles' }],
    steps: ['Cuire les pâtes dans l\'eau salée.', 'Couper les tomates, émincer l\'ail.', 'Faire revenir l\'ail 1 min dans l\'huile.', 'Ajouter les tomates, cuire 10 min.', 'Égoutter et mélanger.'],
  },
  '3': {
    ingrs: [{ n: 'Salade verte', q: '1 tête' }, { n: 'Tomates', q: '2 pcs' }, { n: 'Concombre', q: '1/2' }, { n: 'Vinaigrette', q: '2 c.s.' }],
    steps: ['Laver et essorer la salade.', 'Couper les tomates et le concombre.', 'Mélanger dans un saladier.', 'Assaisonner et servir.'],
  },
  '4': {
    ingrs: [{ n: 'Carottes', q: '2 pcs' }, { n: 'Pommes de terre', q: '2 pcs' }, { n: 'Oignon', q: '1 pcs' }, { n: 'Bouillon', q: '1 L' }],
    steps: ['Éplucher et couper les légumes.', 'Faire revenir l\'oignon 2 min.', 'Ajouter les légumes et le bouillon.', 'Cuire 20 min à feu moyen.', 'Mixer et servir chaud.'],
  },
};

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const detail = MOCK[recipe.id] || { ingrs: [], steps: [] };

  const addToCart = async () => {
    const current = await loadCart();
    const newItems = detail.ingrs.map(i => ({
      label: i.q ? `${i.n} — ${i.q}` : i.n,
      done: false,
    }));
    const merged = [
      ...current,
      ...newItems.filter(n => !current.find(c => c.label === n.label)),
    ];
    await saveCart(merged);
    navigation.navigate('Courses');
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.hero}>
          <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 54, textAlign: 'center' }}>{recipe.emoji}</Text>
          <Text style={s.heroTitle}>{recipe.title}</Text>
          <View style={s.heroTags}>
            <View style={s.dtag}><Text style={s.dtagText}>⏱ {recipe.time}</Text></View>
            <View style={s.dtag}><Text style={s.dtagText}>{recipe.diff}</Text></View>
          </View>
        </View>

        <Text style={s.sec}>Ingrédients</Text>
        {detail.ingrs.map((item, i) => (
          <View key={i} style={s.ingrRow}>
            <View style={s.dot} />
            <Text style={s.ingrName}>{item.n}</Text>
            <Text style={s.ingrQty}>{item.q}</Text>
          </View>
        ))}

        <Text style={s.sec}>Préparation</Text>
        {detail.steps.map((step, i) => (
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
  container:   { flex: 1, backgroundColor: C.bg },
  hero:        { backgroundColor: C.bg2, padding: 22, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.border },
  back:        { alignSelf: 'flex-start', marginBottom: 10 },
  backText:    { color: C.skyMid, fontSize: 13, fontWeight: '700' },
  heroTitle:   { color: C.text, fontSize: 18, fontWeight: '800', marginVertical: 8, textAlign: 'center' },
  heroTags:    { flexDirection: 'row', gap: 8 },
  dtag:        { backgroundColor: C.bg3, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: C.border },
  dtagText:    { color: C.muted, fontSize: 11, fontWeight: '600' },
  sec:         { color: C.skyMid, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', padding: 14, paddingBottom: 6 },
  ingrRow:     { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: C.border },
  dot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: C.red, marginRight: 10 },
  ingrName:    { color: C.text, fontWeight: '600', fontSize: 13, flex: 1 },
  ingrQty:     { color: C.muted, fontSize: 12 },
  stepRow:     { flexDirection: 'row', gap: 10, padding: 10, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: C.border, alignItems: 'flex-start' },
  stepNum:     { minWidth: 24, height: 24, borderRadius: 8, backgroundColor: C.redGlow, borderWidth: 1, borderColor: C.redDark, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: C.red, fontSize: 11, fontWeight: '800' },
  stepText:    { flex: 1, color: C.text, fontSize: 13, lineHeight: 20 },
  cta:         { margin: 18, backgroundColor: C.red, borderRadius: 22, padding: 14, alignItems: 'center' },
  ctaText:     { color: C.white, fontSize: 14, fontWeight: '700' },
});
