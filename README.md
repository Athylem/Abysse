# Abysse

Jeu de culture générale quotidien en français, inspiré de Krillion : il ne suffit pas de donner une bonne réponse, il faut donner la bonne réponse **la plus rare possible** pour plonger au plus profond des abysses.

## Jouer

Ouvrez `index.html` dans un navigateur, ou rendez-vous sur la version en ligne (GitHub Pages).

## Règles

- Une plongée par jour : 7 questions, les mêmes pour tout le monde, tirées de la date. La difficulté augmente au fil de la plongée (★ à ★★★★) : un fruit ou un métier au début, une ville avec un métro, un scientifique ou un élément chimique à la fin.
- Une seule réponse par question, 20 secondes pour la donner. Une réponse valide (ou la fin des 20 s) passe immédiatement à la question suivante, sans pause : le chrono ne s'arrête jamais. Une réponse inconnue n'est pas pénalisée, elle coûte seulement du temps ; sans réponse valide, la question rapporte 0.
- Plus la réponse est rare, plus elle rapporte : Plancton 4, Sardine 12, Espadon 32, Calmar géant 64, Un sur un million 100 points.
- Chaque point vaut 10 m de profondeur ; 700 points (7 000 m) forment une plongée parfaite.
- La progression est enregistrée dans le navigateur (`localStorage`) : recharger la page fait perdre la question en cours.

## Fichiers

- `words.js` : thèmes (avec leur `difficulte` de 1 à 4) et mots classés par rareté ; pour ajouter un thème, copier un bloc existant. Il faut au moins 7 thèmes.
- `game.js` : logique du jeu.
- `index.html`, `style.css` : page et apparence.
