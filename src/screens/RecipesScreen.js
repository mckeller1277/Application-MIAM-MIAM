import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';

const MOCK_RECIPES = [
  { id: '1', emoji: '🍳', title: 'Omelette aux champignons', time: '10 min', diff: 'Facile',     tags: ['rapide'],      needs: ['oeufs', 'beurre'] },
  { id: '2', emoji: '🍝', title: 'Pâtes à la tomate',        time: '20 min', diff: 'Facile',     tags: ['végétarien'],  needs: ['tomates'] },
  { id: '3', emoji: '🥗', title: 'Salade fraîche',           time: '5 min',  diff: 'Très facile',tags: ['vegan','rapide'],needs: ['tomates'] },
  { id: '4', emoji: '🍲', title: 'Soupe de légumes',         time: '30 min', diff: 'Facile',     tags: ['vegan'],       needs: ['carottes'] },
];

const FILTERS = ['Tous', 'Rapide', 'Végétarien', 'Facile'];

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D',
  skyMid: '#5294C4', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

export default function RecipesScreen({ route, navigation }) {
  const selected      = route.params?.selectedIngredients || [];
  const [filter, setFilter] = useState('Tous');

  const score = (r) => {
    if (!selected.length) return 1;
    const matched = r.needs.filter(n => selected.some(s => s.includes(n) || n.includes(s)));
    return matched.length / r.needs.length;
  };

  let list = [...MOCK_RECIPES];
  if (filter === 'Rapide')      list = list.filter(r => r.tags.includes('rapide') || parseInt(r.time) <= 10);
  if (filter === 'Végétarien')  list = list.filter(r => r.tags.some(t => t.includes('végétarien') || t.includes('vegan')));
  if (filter === 'Facile')      list = list.filter(r => r.diff.toLowerCase().includes('facile'));
  list.sort((a, b) => score(b) - score(a));

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Recettes suggérées</Text>
      </View>

      <View style={s.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[s.fchip, filter === f && s.fchipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[s.fchipText, filter === f && s.fchipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={list}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const pct = Math.round(score(item) * 100);
          return (
            <TouchableOpacity
              style={s.card}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={s.cardImg}>
                <Text style={{ fontSize: 34 }}>{item.emoji}</Text>
              </View>
              <View style={s.cardBody}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <View style={s.tags}>
                  <View style={[s.tag, s.tagTime]}><Text style={s.tagText}>⏱ {item.time}</Text></View>
                  <View style={s.tag}><Text style={s.tagText}>{item.diff}</Text></View>
                </View>
                <View style={s.matchRow}>
                  <View style={s.matchBar}>
                    <View style={[s.matchFill, { width: `${pct}%` }]} />
                  </View>
                  <Text style={s.matchPct}>{pct}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.bg },
  header:         { backgroundColor: C.bg2, padding: 18, borderBottomWidth: 1, borderBottomColor: C.border },
  title:          { color: C.white, fontSize: 18, fontWeight: '800' },
  filterRow:      { flexDirection: 'row', padding: 10, gap: 6, flexWrap: 'wrap' },
  fchip:          { paddingHorizontal: 13, paddingVertical: 5, borderRadius: 16, backgroundColor: C.bg3, borderWidth: 1.5, borderColor: C.skyLight },
  fchipActive:    { backgroundColor: C.red, borderColor: C.redDark },
  fchipText:      { color: C.muted, fontSize: 11, fontWeight: '700' },
  fchipTextActive:{ color: C.white },
  card:           { flexDirection: 'row', backgroundColor: C.bg2, marginHorizontal: 14, marginBottom: 10, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  cardImg:        { width: 78, backgroundColor: C.bg3, alignItems: 'center', justifyContent: 'center' },
  cardBody:       { flex: 1, padding: 11 },
  cardTitle:      { color: C.text, fontSize: 13, fontWeight: '700', marginBottom: 5 },
  tags:           { flexDirection: 'row', gap: 5, marginBottom: 6, flexWrap: 'wrap' },
  tag:            { backgroundColor: C.skyLight, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  tagTime:        { backgroundColor: 'rgba(232,38,58,0.18)' },
  tagText:        { color: C.text, fontSize: 10, fontWeight: '700' },
  matchRow:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  matchBar:       { flex: 1, height: 5, backgroundColor: C.bg3, borderRadius: 3, overflow: 'hidden' },
  matchFill:      { height: '100%', backgroundColor: C.red, borderRadius: 3 },
  matchPct:       { color: C.red, fontSize: 10, fontWeight: '700', minWidth: 30, textAlign: 'right' },
});
