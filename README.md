# TRJ Calculator

## Description

TRJ Calculator est une extension Chrome qui permet de calculer automatiquement le Taux de Retour aux Joueurs (TRJ) sur les sites de bookmakers. L'extension analyse les cotes disponibles pour un match donné et calcule le TRJ afin de fournir à l'utilisateur une évaluation rapide de la rentabilité potentielle d'un pari.

## Fonctionnalités

- Calcul automatique du TRJ pour les paris à 2 ou 3 issues.
- Affichage d'une évaluation du TRJ directement sur la page du match concerné

## Sites supportés

L'extension fonctionne sur les sites de paris suivants :

- [Betclic](https://www.betclic.fr/)
- [Unibet](https://www.unibet.fr/)
- [ParionsSport](https://enligne.parionssport.fdj.fr/)
- [Winamax](https://www.winamax.fr/)

## Comment ça fonctionne

1. **Détection du site :** L'extension détecte automatiquement le site de paris sur lequel vous vous trouvez.
2. **Extraction des cotes :** L'extension extrait les cotes affichées pour un match spécifique.
3. **Calcul du TRJ :** Le Taux de Retour aux Joueurs est calculé en fonction des cotes extraites.
4. **Affichage du TRJ :** Le TRJ calculé est affiché directement sur la page du site, avec une évaluation colorée du TRJ (favorable, correct, défavorable, surebet).

## Installation

1. Clonez ou téléchargez ce projet.
2. Ouvrez `chrome://extensions/` dans votre navigateur Chrome.
3. Activez le mode développeur.
4. Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier contenant ce projet.

## Génération de l'extension

1. **Pré-requis :** Avoir Node.js et npm installés.
2. **Installation des dépendances :** Exécutez `npm install` dans le dossier racine du projet.
3. **Génération de l'extension :** Exécutez `npx webpack` pour créer le fichier `content.js` dans le dossier `dist`.
4. **Chargement de l'extension :** Ouvrez `chrome://extensions/`, activez le mode développeur, et chargez le dossier contenant les fichiers générés.

## Utilisation

- Accédez à l'un des sites de paris pris en charge (Betclic, Unibet, ParionsSport, Winamax).
- Rendez-vous sur la page d'un match.
- Fonctionne pour les résultats des matchs de Tennis, Football, Basket, Baseball, Beach-volley, Boxe, MMA, Rugby, Volleyball, Badminton et Snooker.
- Le TRJ est calculé et affiché directement sur la page de l'événement sélectionné.

## Remarques

- L'extension se base sur la structure du DOM des sites pris en charge. Si la structure de ces sites change, l'extension peut nécessiter une mise à jour pour continuer de fonctionner.
- La compatibilité avec les futures versions de Chrome peut nécessiter des ajustements si les politiques de sécurité changent.
