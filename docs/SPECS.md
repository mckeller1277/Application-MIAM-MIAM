# Spécifications techniques — Miam Miam v1.0

## Architecture

```
Utilisateur → React Native UI → Services API → TheMealDB
                              → AsyncStorage (données locales)
                              → expo-barcode-scanner (caméra)
```

## Écrans

| Écran            | Fichier                  | Description                         |
|------------------|--------------------------|-------------------------------------|
| Frigo            | FridgeScreen.js          | Gestion des ingrédients + scanner   |
| Recettes         | RecipesScreen.js         | Liste filtrée des recettes          |
| Détail recette   | RecipeDetailScreen.js    | Étapes + ajout à la liste courses   |
| Courses          | CartScreen.js            | Liste de courses avec checklist     |

## API TheMealDB

- Base URL : `https://www.themealdb.com/api/json/v1/1`
- Gratuite, sans authentification requise
- Endpoints utilisés :
  - `GET /filter.php?i={ingredient}` — liste de recettes par ingrédient
  - `GET /lookup.php?i={id}` — détail complet d'une recette

## Stockage local (AsyncStorage)

| Clé                    | Type                   | Description              |
|------------------------|------------------------|--------------------------|
| `@miam_miam_fridge`    | `string[]`             | Liste d'ingrédients      |
| `@miam_miam_cart`      | `{label, done}[]`      | Liste de courses         |

## Palette de couleurs (thème sombre)

| Variable    | Hex       | Usage                        |
|-------------|-----------|------------------------------|
| `--bg`      | #0A1628   | Fond principal               |
| `--bg2`     | #111E35   | Surfaces / header            |
| `--bg3`     | #1A2B47   | Chips / inputs               |
| `--red`     | #E8263A   | Accent principal / boutons   |
| `--sky`     | #1B6CA8   | Bleu ciel secondaire         |
| `--text`    | #E8F0FB   | Texte principal              |
| `--muted`   | #7A99BB   | Texte secondaire             |

## Roadmap

### v1.0 — MVP ✅
- Gestion du frigo (ajout, suppression, sélection)
- Recherche par ingrédients (données locales)
- Filtres (Rapide, Végétarien, Facile)
- Détail des recettes avec étapes
- Liste de courses auto-générée

### v1.1 — Intégration API
- Connexion à TheMealDB en temps réel
- Scanner de codes-barres fonctionnel
- Persistance complète entre sessions

### v2.0 — Évolutions
- Personnalisation selon régimes alimentaires (vegan, sans gluten...)
- Recommandations intelligentes basées sur les habitudes
- Partage de recettes (fonctionnalités communautaires)
