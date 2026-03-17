import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchRecipes, getPopularRecipes } from '../data/RecipesData';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D',
  skyMid: '#5294C4', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

export default function RecipesScreen({ route, navigation }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const fromFridge = selectedIngredients.length > 0;

  const recipes = fromFridge
    ? searchRecipes(selectedIngredients)
    : getPopularRecipes();

  const [activeFilter, setActiveFilter] = useState('Tous');
  const FILTERS = ['Tous', 'Rapide', 'Facile', 'Desserts'];

  const filtered = recipes.filter(r => {
    if (activeFilter === 'Rapide') return r.time <= 20;
    if (activeFilter === 'Facile') return r.difficulty === 'Facile';
    if (activeFilter === 'Desserts') return r.category === 'Desserts';
    return true;
  });

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>
          {fromFridge ? '🧊 Recettes de votre frigo' : '🍽️ Toutes les recettes'}
        </Text>
        <Text style={s.sub}>
          {fromFridge
            ? `${recipes.length} recettes trouvées`
            : `${recipes.length} recettes disponibles`}
        </Text>
      </View>

      <View style={s.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[s.fchip, activeFilter === f && s.fchipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[s.fchipText, activeFilter === f && s.fchipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={s.center}>
          <Text style={{ fontSize: 40 }}>🤷</Text>
          <Text style={s.emptyText}>
            {fromFridge
              ? 'Aucune recette avec ces ingrédients.\nEssayez d\'en ajouter d\'autres !'
              : 'Aucune recette dans cette catégorie.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.card}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={s.cardEmoji}>
                <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
              </View>
              <View style={s.cardBody}>
                <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={s.tags}>
                  <View style={s.tag}><Text style={s.tagText}>⏱ {item.time} min</Text></View>
                  <View style={s.tag}><Text style={s.tagText}>{item.difficulty}</Text></View>
                  <View style={s.tag}><Text style={s.tagText}>{item.category}</Text></View>
                </View>
                {fromFridge && item.matchPct !== undefined && (
                  <View style={s.matchRow}>
                    <View style={s.matchBar}>
                      <View style={[s.matchFill, { width: `${item.matchPct}%` }]} />
                    </View>
                    <Text style={s.matchPct}>{item.matchPct}%</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.bg2, padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { color: C.white, fontSize: 16, fontWeight: '800' },
  sub: { color: C.muted, fontSize: 11, marginTop: 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { color: C.muted, fontSize: 13, textAlign: 'center', paddingHorizontal: 20, lineHeight: 20 },
  filterRow: { flexDirection: 'row', padding: 10, gap: 6, flexWrap: 'wrap' },
  fchip: { paddingHorizontal: 13, paddingVertical: 5, borderRadius: 16, backgroundColor: C.bg3, borderWidth: 1.5, borderColor: C.skyLight },
  fchipActive: { backgroundColor: C.red, borderColor: C.redDark },
  fchipText: { color: C.muted, fontSize: 11, fontWeight: '700' },
  fchipTextActive: { color: C.white },
  card: { flexDirection: 'row', backgroundColor: C.bg2, marginHorizontal: 14, marginBottom: 10, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  cardEmoji: { width: 90, backgroundColor: C.bg3, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, padding: 11 },
  cardTitle: { color: C.text, fontSize: 13, fontWeight: '700', marginBottom: 5 },
  tags: { flexDirection: 'row', gap: 5, marginBottom: 6, flexWrap: 'wrap' },
  tag: { backgroundColor: C.skyLight, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  tagText: { color: C.text, fontSize: 10, fontWeight: '700' },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  matchBar: { flex: 1, height: 5, backgroundColor: C.bg3, borderRadius: 3, overflow: 'hidden' },
  matchFill: { height: '100%', backgroundColor: C.red, borderRadius: 3 },
  matchPct: { color: C.red, fontSize: 10, fontWeight: '700', minWidth: 35, textAlign: 'right' },
});
