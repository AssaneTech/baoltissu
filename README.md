# Baoltissu

Un petit projet e‑commerce (front-end) en React + Vite + Tailwind. Ce dépôt contient principalement la partie `frontend` — le dossier `backend` est actuellement vide.

## Description

Application frontend React construite avec Vite. Elle contient des pages pour catalogue, panier, authentification, et des composants réutilisables (Navbar, Footer, etc.).

## Stack technique

- Frontend: React 19, Vite, Tailwind CSS
- Routage: `react-router-dom`
- Outils: ESLint, `@vitejs/plugin-react`

## Prérequis

- Node.js (v18+ recommandé)
- npm (ou yarn / pnpm)

## Installation et exécution

Ouvrir un terminal et lancer :

```bash
# se placer dans le dossier du projet
cd /path/to/baoltissu

# installer les dépendances du frontend
cd frontend
npm install

# lancer le serveur de développement
npm run dev
```

Le frontend est un projet Vite — il démarre par défaut sur `http://localhost:5173` (Vite). Si vous changez de port, utilisez la sortie de la commande `npm run dev`.

## Scripts utiles (dans `frontend/package.json`)

- `npm run dev` : démarre le serveur de développement Vite
- `npm run build` : construit les fichiers de production
- `npm run preview` : prévisualise le build de production
- `npm run lint` : lance ESLint

## Structure importante

- `frontend/src` : code React (pages, composants, context...)
- `frontend/index.html` : point d'entrée HTML de Vite
- `frontend/vite.config.js` : configuration Vite
- `frontend/package.json` : scripts & dépendances
- `backend/` : dossier présent mais vide (aucune API pour l'instant)

## Données

Il y a un dossier `frontend/data` prévu pour des données (fichier `data.json` actuellement vide). Si vous avez des fixtures ou un API, placez-les/consommez-les depuis ce dossier ou implémentez un backend.

## Développement et contribution

- Créez une branche nommée `feature/xxx` pour les nouvelles fonctionnalités.
- Respectez les règles ESLint du projet (`npm run lint`).
- Ouvrez une Pull Request décrivant les changements et étapes de test.

## Backend

Le dossier `backend` est actuellement vide. Pour ajouter une API :

1. Choisissez un framework (Express, Fastify, Nest, etc.).
2. Ajoutez `backend/package.json` avec scripts `dev`/`start` et documentez les variables d'environnement.

## Questions / prochaines étapes

- Voulez-vous que je crée un squelette pour le `backend` (Express + endpoints de base) ?
- Dois-je ajouter des instructions de déploiement (Netlify, Vercel, Heroku, Docker, etc.) ?

## Licence

Ajoutez ici la licence souhaitée (MIT, Apache-2.0, etc.).

---

Si tu veux, je peux aussi :
- générer un `backend` minimal (Express) et des endpoints pour produits/panier,
- documenter les variables d'environnement,
- ajouter un `README` détaillé pour le frontend seulement.
