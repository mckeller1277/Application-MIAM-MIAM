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

const API_KEY = 'be597782e6c24111a7da7cc0618e5862';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export default function RecipesScreen({ route, navigation }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchRecipes(); }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Recherche par ingrédients — uniquement les recettes qui utilisent CES ingrédients
      const ingredientList = selectedIngredients.join(',');
      const res = await axios.get(`${BASE_URL}/findByIngredients`, {
        params: {
          apiKey: API_KEY,
          ingredients: ingredientList,
          number: 20,
          ranking: 1, // maximise les ingrédients utilisés
          ignorePantry: true,
          language: 'fr',
        }
      });

      const meals = res.data || [];

      // Récupérer les détails de chaque recette pour avoir le titre en français
      const detailed = await Promise.all(
        meals.slice(0, 10).map(meal =>
          axios.get(`${BASE_URL}/${meal.id}/information`, {
            params: { apiKey: API_KEY, language: 'fr' }
          }).then(r => ({
            id: String(r.data.id),
            title: r.data.title,
            thumbnail: r.data.image,
            readyInMinutes: r.data.readyInMinutes,
            servings: r.data.servings,
            usedIngredients: meal.usedIngredientCount,
            missedIngredients: meal.missedIngredientCount,
            matchPct: Math.round((meal.usedIngredientCount / (meal.usedIngredientCount + meal.missedIngredientCount)) * 100),
          })).catch(() => null)
        )
      );

      setRecipes(detailed.filter(Boolean).sort((a, b) => b.matchPct - a.matchPct));
    } catch (e) {
      setError('Impossible de charger les recettes. Vérifiez votre connexion.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Recettes suggérées</Text>
        <Text style={s.sub}>{recipes.length} recettes avec vos ingrédients</Text>
      </View>

      {loading ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color={C.red} />
          <Text style={s.loadingText}>Recherche de recettes...</Text>
        </View>
      ) : error ? (
        <View style={s.loading}>
          <Text style={{ fontSize: 40 }}>😕</Text>
          <Text style={[s.loadingText, { textAlign: 'center', paddingHorizontal: 20 }]}>{error}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={fetchRecipes}>
            <Text style={s.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : recipes.length === 0 ? (
        <View style={s.loading}>
          <Text style={{ fontSize: 40 }}>🤷</Text>
          <Text style={[s.loadingText, { textAlign: 'center', paddingHorizontal: 20 }]}>
            Aucune recette trouvée avec ces ingrédients.{'\n'}Essayez d'en ajouter d'autres !
          </Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.card}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id, title: item.title })}
            >
              {item.thumbnail
                ? <Image source={{ uri: item.thumbnail }} style={s.cardImg} />
                : <View style={[s.cardImg, s.cardImgFallback]}><Text style={{ fontSize: 30 }}>🍽️</Text></View>
              }
              <View style={s.cardBody}>
                <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={s.tags}>
                  {item.readyInMinutes ? <View style={s.tag}><Text style={s.tagText}>⏱ {item.readyInMinutes} min</Text></View> : null}
                  <View style={s.tag}><Text style={s.tagText}>✓ {item.usedIngredients} ingr.</Text></View>
                </View>
                <View style={s.matchRow}>
                  <View style={s.matchBar}>
                    <View style={[s.matchFill, { width: `${item.matchPct}%` }]} />
                  </View>
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
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: C.muted, fontSize: 13 },
  retryBtn: { backgroundColor: C.red, borderRadius: 22, paddingVertical: 10, paddingHorizontal: 24, marginTop: 8 },
  retryText: { color: C.white, fontSize: 13, fontWeight: '700' },
  card: { flexDirection: 'row', backgroundColor: C.bg2, marginHorizontal: 14, marginBottom: 10, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  cardImg: { width: 90, height: 90 },
  cardImgFallback: { backgroundColor: C.bg3, alignItems: 'center', justifyContent: 'center' },
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
