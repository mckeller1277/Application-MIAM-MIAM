# 🍴 Miam Miam

> Application Android pour trouver des recettes à partir des ingrédients de votre frigo.

![Version](https://img.shields.io/badge/version-1.0.0-red)
![Platform](https://img.shields.io/badge/platform-Android-blue)
![Framework](https://img.shields.io/badge/framework-React%20Native-61DAFB)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Aperçu

**Miam Miam** est une application mobile Android qui permet aux utilisateurs de :
- Gérer le contenu de leur frigo
- Trouver des recettes compatibles avec les ingrédients disponibles
- Scanner des codes-barres pour ajouter des produits rapidement
- Générer automatiquement une liste de courses

---

## Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| Gestion du frigo | ✅ MVP |
| Recherche de recettes par ingrédients | ✅ MVP |
| Filtres (rapide, végétarien, facile) | ✅ MVP |
| Liste de courses automatique | ✅ MVP |
| Scanner de code-barres | 🔄 En cours |
| Personnalisation régimes alimentaires | 📋 Prévu |
| Recommandations intelligentes | 📋 Prévu |
| Fonctionnalités communautaires | 📋 Prévu |

---

## Stack technique

- **Framework** : React Native (Expo)
- **Navigation** : React Navigation v6
- **API Recettes** : TheMealDB (gratuite)
- **Scanner** : expo-barcode-scanner
- **State** : React Context + AsyncStorage
- **Langage** : JavaScript (ES2021)

---

## Installation

### Prérequis

- Node.js >= 18
- npm ou yarn
- Expo CLI : `npm install -g expo-cli`
- Android Studio (pour l'émulateur) ou un appareil Android

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-utilisateur/miam-miam.git
cd miam-miam

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npx expo start

# 4. Scanner le QR code avec l'app Expo Go sur votre téléphone
#    OU appuyer sur 'a' pour ouvrir l'émulateur Android
```

---

## Structure du projet

```
miam-miam/
├── src/
│   ├── screens/          # Écrans de l'application
│   │   ├── FridgeScreen.js
│   │   ├── RecipesScreen.js
│   │   ├── RecipeDetailScreen.js
│   │   └── CartScreen.js
│   ├── components/       # Composants réutilisables
│   │   ├── IngredientChip.js
│   │   ├── RecipeCard.js
│   │   └── CartItem.js
│   ├── services/         # Appels API
│   │   └── recipeService.js
│   ├── navigation/       # Configuration de la navigation
│   │   └── AppNavigator.js
│   ├── utils/            # Fonctions utilitaires
│   │   └── storage.js
│   └── assets/           # Images, icônes, polices
├── docs/                 # Documentation
│   └── SPECS.md
├── app.json
├── App.js
├── package.json
└── README.md
```

---

## API

L'application utilise [TheMealDB](https://www.themealdb.com/api.php) — API gratuite et sans clé requise pour le MVP.

```
GET https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}
```

---

## Contribuer

1. Fork le projet
2. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
3. Committer : `git commit -m "feat: ajouter ma fonctionnalité"`
4. Pousser : `git push origin feature/ma-fonctionnalite`
5. Ouvrir une Pull Request

---

## Licence

MIT — voir [LICENSE](LICENSE)
