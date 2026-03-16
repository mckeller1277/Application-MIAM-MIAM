import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', redDark: '#B01E2D',
  skyMid: '#5294C4', skyLight: '#2A4A6E',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};
const FILTERS = ['Tous', 'Rapide', 'Végétarien', 'Facile'];
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export default function RecipesScreen({ route, navigation }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => { fetchRecipes(); }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      if (selectedIngredients.length === 0) {
        const res = await axios.get(`${BASE_URL}/search.php?s=`);
        setRecipes((res.data.meals || []).slice(0, 20).map(m => ({
          id: m.idMeal, title: m.strMeal, thumbnail: m.strMealThumb,
          category: m.strCategory, area: m.strArea, matchPct: 100,
        })));
      } else {
        const results = await Promise.all(
          selectedIngredients.slice(0, 5).map(ing =>
            axios.get(`${BASE_URL}/filter.php?i=${ing}`).then(r => r.data.meals || []).catch(() => [])
          )
        );
        const counts = {};
        results.forEach(meals => {
          meals.forEach(meal => {
            if (!counts[meal.idMeal]) counts[meal.idMeal] = { meal, count: 0 };
            counts[meal.idMeal].count++;
          });
        });
        setRecipes(Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 20).map(({ meal, count }) => ({
          id: meal.idMeal, title: meal.strMeal, thumbnail: meal.strMealThumb,
          category: '', area: '',
          matchPct: Math.round((count / Math.min(selectedIngredients.length, 5)) * 100),
        })));
      }
    } catch (e) {
      setRecipes([
        { id: '1', title: 'Omelette aux champignons', thumbnail: null, category: 'Breakfast', matchPct: 100 },
        { id: '2', title: 'Pâtes à la tomate', thumbnail: null, category: 'Pasta', matchPct: 80 },
      ]);
    }
    setLoading(false);
  };

  const filtered = recipes.filter(r => {
    if (activeFilter === 'Végétarien') return ['Vegetarian', 'Vegan', 'Side'].includes(r.category);
    if (activeFilter === 'Rapide') return r.matchPct >= 80;
    return true;
  });

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Recettes suggérées</Text>
        <Text style={s.sub}>{recipes.length} recettes trouvées</Text>
      </View>
      <View style={s.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} style={[s.fchip, activeFilter === f && s.fchipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.fchipText, activeFilter === f && s.fchipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color={C.red} />
          <Text style={s.loadingText}>Recherche en cours...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered} keyExtractor={item => item.id} contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.card} onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id, title: item.title })}>
              {item.thumbnail
                ? <Image source={{ uri: item.thumbnail }} style={s.cardImg} />
                : <View style={[s.cardImg, s.cardImgFallback]}><Text style={{ fontSize: 30 }}>🍽️</Text></View>
              }
              <View style={s.cardBody}>
                <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
                {item.category ? <View style={s.tags}><View style={s.tag}><Text style={s.tagText}>{item.category}</Text></View></View> : null}
                <View style={s.matchRow}>
                  <View style={s.matchBar}><View style={[s.matchFill, { width: `${item.matchPct}%` }]} /></View>
                  <Text style={s.matchPct}>{item.matchPct}%</Text>
                </View>
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
  title: { color: C.white, fontSize: 18, fontWeight: '800' },
  sub: { color: C.muted, fontSize: 11, marginTop: 2 },
  filterRow: { flexDirection: 'row', padding: 10, gap: 6, flexWrap: 'wrap' },
  fchip: { paddingHorizontal: 13, paddingVertical: 5, borderRadius: 16, backgroundColor: C.bg3, borderWidth: 1.5, borderColor: C.skyLight },
  fchipActive: { backgroundColor: C.red, borderColor: C.redDark },
  fchipText: { color: C.muted, fontSize: 11, fontWeight: '700' },
  fchipTextActive: { color: C.white },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: C.muted, fontSize: 13 },
  card: { flexDirection: 'row', backgroundColor: C.bg2, marginHorizontal: 14, marginBottom: 10, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  cardImg: { width: 90, height: 90 },
  cardImgFallback: { backgroundColor: C.bg3, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, padding: 11 },
  cardTitle: { color: C.text, fontSize: 13, fontWeight: '700', marginBottom: 5 },
  tags: { flexDirection: 'row', gap: 5, marginBottom: 6 },
  tag: { backgroundColor: C.skyLight, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  tagText: { color: C.text, fontSize: 10, fontWeight: '700' },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  matchBar: { flex: 1, height: 5, backgroundColor: C.bg3, borderRadius: 3, overflow: 'hidden' },
  matchFill: { height: '100%', backgroundColor: C.red, borderRadius: 3 },
  matchPct: { color: C.red, fontSize: 10, fontWeight: '700', minWidth: 35, textAlign: 'right' },
});
