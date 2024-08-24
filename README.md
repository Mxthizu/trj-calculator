# TRJ Calculator

## Description

TRJ Calculator est une extension Chrome qui permet de calculer automatiquement le Taux de Retour aux Joueurs (TRJ) sur les sites de bookmakers. Elle fonctionne sur plusieurs sites de paris en ligne, y compris Betclic, Unibet, ParionsSport et Winamax. L'extension analyse les cotes disponibles pour un match donné et calcule le TRJ afin de fournir aux utilisateurs une évaluation rapide de la rentabilité potentielle d'un pari.

## Fonctionnalités

- Calcul automatique du TRJ pour les paris à 2 ou 3 issues.
- Prise en charge de plusieurs sites de paris en ligne (Betclic, Unibet, ParionsSport, Winamax).
- Affichage d'une évaluation du TRJ directement dans l'extension.

## Comment ça fonctionne

1. **Détection du site :** L'extension détecte automatiquement le site de paris sur lequel vous vous trouvez.
2. **Extraction des cotes :** L'extension extrait les cotes affichées.
3. **Calcul du TRJ :** Le Taux de Retour aux Joueurs est calculé en fonction des cotes extraites.
4. **Affichage du TRJ :** Le TRJ calculé est affiché dans l'extension avec une évaluation du TRJ (favorable, correct, défavorable, surebet).

## Installation

1. Clonez ou téléchargez ce projet.
2. Ouvrez `chrome://extensions/` dans votre navigateur Chrome.
3. Activez le mode développeur.
4. Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier contenant ce projet.

## Utilisation

- Accédez à l'un des sites de paris pris en charge (Betclic, Unibet, ParionsSport, Winamax).
- Vous devez obligatoirement vous rendre sur la page d'un match.
- L'extension fonctionne pour les résultats uniquement des matchs de Tennis, Football, Basket, Baseball, Beach-volley, Boxe, MMA, Rugby, Volleyball, Badminton et Snooker.
- L'extension calculera automatiquement le TRJ et l'affichera dans l'extension lorsque vous cliquez sur l'icône de l'extension.

## Remarques

- L'extension se base sur la structure du DOM des sites pris en charge. Si la structure de ces sites change, il pourrait être nécessaire de mettre à jour l'extension pour qu'elle continue de fonctionner correctement.
