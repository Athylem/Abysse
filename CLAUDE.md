# Contexte projet — Abysse

## Description
Jeu de culture générale quotidien en français, inspiré de Krillion : 7 questions par jour (les mêmes pour tout le monde), une réponse par question, plus elle est rare plus on plonge profond.

## Composants principaux
- `index.html`, `style.css` : page et apparence.
- `game.js` : logique (tirage quotidien par graine de date, chrono, score, sauvegarde `localStorage`, partage).
- `words.js` : thèmes et mots classés en 5 niveaux de rareté (il faut au moins 7 thèmes).

## Contraintes clés
- Aucun build : 100 % statique, ouvrir `index.html` suffit (publication prévue sur GitHub Pages).
- Une plongée par jour ; la question en cours est enregistrée dès son début (recharger la page la fait perdre).
- Points par niveau : 4, 12, 32, 64, 100 ; 1 point = 10 m ; plongée parfaite = 700 points (7 000 m).

## État avancement
- Fait : mode principal « Daily Dive », écran de fin avec partage et compte à rebours.
- À faire : plus de thèmes/mots, tests dans un vrai navigateur, GitHub Pages, ajustement des valeurs de points.

## Fichiers importants
- Dépôt : `github.com/Athylem/Abysse` (branche `main`), versionné séparément du vault.
