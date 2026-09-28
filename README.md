# Abysse

Jeu de culture générale quotidien en français, inspiré de Krillion : il ne suffit pas de donner une bonne réponse, il faut donner la bonne réponse **la plus rare possible** pour plonger au plus profond des abysses.

## Jouer

Ouvrez `index.html` dans un navigateur, ou rendez-vous sur la version en ligne (GitHub Pages).

## Règles

- Une plongée par jour : 7 questions (les 7 thèmes), les mêmes pour tout le monde, dans un ordre tiré de la date.
- Une seule réponse par question, 20 secondes pour la donner. Une réponse inconnue n'est pas pénalisée, elle coûte seulement du temps ; sans réponse valide, la question rapporte 0.
- Plus la réponse est rare, plus elle rapporte : Plancton 4, Sardine 12, Espadon 32, Calmar géant 64, Un sur un million 100 points.
- Chaque point vaut 10 m de profondeur ; 700 points (7 000 m) forment une plongée parfaite.
- La progression est enregistrée dans le navigateur (`localStorage`) : recharger la page fait perdre la question en cours.

## Fichiers

- `words.js` : thèmes et mots classés par rareté (pour ajouter des thèmes ; il faut au moins 7 thèmes).
- `game.js` : logique du jeu.
- `index.html`, `style.css` : page et apparence.
