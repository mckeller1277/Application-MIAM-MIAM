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

// Traduction français → anglais pour les ingrédients courants
const FR_TO_EN = {
  'oeufs': 'eggs', 'oeuf': 'egg', 'tomates': 'tomatoes', 'tomate': 'tomato',
  'fromage': 'cheese', 'carottes': 'carrots', 'carotte': 'carrot',
  'beurre': 'butter', 'lait': 'milk', 'pommes de terre': 'potatoes',
  'pomme de terre': 'potato', 'poulet': 'chicken', 'boeuf': 'beef',
  'porc': 'pork', 'pâtes': 'pasta', 'riz': 'rice', 'oignon': 'onion',
  'oignons': 'onions', 'ail': 'garlic', 'sel': 'salt', 'poivre': 'pepper',
  'huile': 'oil', 'farine': 'flour', 'sucre': 'sugar', 'citron': 'lemon',
  'champignons': 'mushrooms', 'champignon': 'mushroom', 'épinards': 'spinach',
  'courgette': 'zucchini', 'poivron': 'bell pepper', 'crème': 'cream',
  'yaourt': 'yogurt', 'jambon': 'ham', 'lardons': 'bacon', 'thon': 'tuna',
  'saumon': 'salmon', 'crevettes': 'shrimp', 'pomme': 'apple', 'banane': 'banana',
};

function translateIngredient(fr) {
  const lower = fr.toLowerCase().trim();
  return FR_TO_EN[lower] || lower;
}

export default function RecipesScreen({ route, navigation }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const fromFridge = selectedIngredients.length > 0;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchRecipes(); }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      let meals = [];

      if (fromFridge) {
        // Traduire les ingrédients en anglais pour l'API
        const translatedIngredients = selectedIngredients.map(translateIngredient).join(',');

        const res = await axios.get(`${BASE_URL}/findByIngredients`, {
          params: {
            apiKey: API_KEY,
            ingredients: translatedIngredients,
            number: 15,
            ranking: 2,
            ignorePantry: false,
          }
        });
        meals = (res.data || []).map(m => ({
          id: String(m.id),
          title: m.title,
          thumbnail: m.image,
          usedIngredients: m.usedIngredientCount,
          missedIngredients: m.missedIngredientCount,
          matchPct: Math.round((m.usedIngredientCount / (m.usedIngredientCount + m.missedIngredientCount || 1)) * 100),
          readyInMinutes: null,
        }));
      } else {
        // Onglet Recettes — recettes populaires
        const res = await axios.get(`${BASE_URL}/random`, {
          params: { apiKey: API_KEY, number: 20 }
        });
        meals = (res.data.recipes || []).map(m => ({
          id: String(m.id),
          title: m.title,
          thumbnail: m.image,
          usedIngredients: null,
          missedIngredients: null,
          matchPct: null,
          readyInMinutes: m.readyInMinutes,
        }));
      }

      setRecipes(meals);
    } catch (e) {
      setError('Impossible de charger les recettes.\nVérifiez votre connexion internet.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>
          {fromFridge ? '🧊 Recettes de votre frigo' : '🍽️ Recettes populaires'}
        </Text>
        <Text style={s.sub}>
          {fromFridge
            ? `Basé sur ${selectedIngredients.length} ingrédients`
            : `${recipes.length} recettes disponibles`}
        </Text>
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={C.red} />
          <Text style={s.loadingText}>Recherche en cours...</Text>
        </View>
      ) : error ? (
        <View style={s.center}>
          <Text style={{ fontSize: 40 }}>😕</Text>
          <Text style={s.errorText}>{error}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={fetchRecipes}>
            <Text style={s.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : recipes.length === 0 ? (
        <View style={s.center}>
          <Text style={{ fontSize: 40 }}>🤷</Text>
          <Text style={s.errorText}>Aucune recette trouvée.{'\n'}Essayez d'autres ingrédients !</Text>
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
                  {item.usedIngredients !== null ? <View style={s.tag}><Text style={s.tagText}>✓ {item.usedIngredients} ingr.</Text></View> : null}
                  {item.missedIngredients !== null ? <View style={[s.tag, { backgroundColor: 'rgba(232,38,58,0.15)' }]}><Text style={[s.tagText, { color: C.red }]}>+ {item.missedIngredients} manquants</Text></View> : null}
                </View>
                {item.matchPct !== null && (
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
  loadingText: { color: C.muted, fontSize: 13 },
  errorText: { color: C.muted, fontSize: 13, textAlign: 'center', paddingHorizontal: 20, lineHeight: 20 },
  retryBtn: { backgroundColor: C.red, borderRadius: 22, paddingVertical: 10, paddingHorizontal: 24 },
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
