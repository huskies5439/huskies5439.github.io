# Note

Ce dépôt est basé sur le projet QRScout original de l'équipe 2713. Tous les crédits leur reviennent.  
L'objectif principal de ce projet est d'aller au-delà du QRScout original en ajoutant des fonctionnalités comme les avis sur les robots ou une méthode plus efficace que les codes QR.

# QRScout

Un système de scouting basé sur les codes QR pour la FRC.

## Démarrage

QRScout est une application web. Pour l'ouvrir, il suffit de visiter : [QRScout](https://frc2713.github.io/QRScout/).

QRScout permet de saisir des données sur les robots participant à un match de FRC via un formulaire. Ces informations sont ensuite converties en code QR sous forme de liste, séparée par défaut par des tabulations. Ce code QR peut être scanné et intégré dans un tableur comme Microsoft Excel ou Google Sheets pour analyse.

## Utilisation de QRScout

Lorsque vous accédez à QRScout, vous verrez un écran ressemblant à ceci :  
![Page d'accueil de QRScout](src/assets/images/main_screen.png)

En haut, la majeure partie de la page est occupée par des champs de formulaire. Ces champs permettent de saisir les données qui seront converties en code QR.

Certains champs sont obligatoires, d'autres non. QRScout n'autorisera pas l'envoi du formulaire tant que tous les champs obligatoires ne sont pas remplis.

![Bas de la page d'accueil de QRScout](src/assets/images/main_screen_bottom.png)

En bas de la page, plusieurs boutons sont disponibles :

- **Commit** : Génère un code QR avec les données saisies et affiche le texte encodé à côté du code QR.
- **Reset Form** : Réinitialise la plupart des champs du formulaire sans recharger la page. La colonne "Prematch" conserve ses valeurs pour éviter une ressaisie répétitive.
- **Copy Column Names** : Copie les noms des colonnes dans le presse-papiers.
- **Edit Config** : Ouvre l'éditeur `config.json`.
- Trois boutons supplémentaires permettent de basculer entre les modes clair et sombre ou d'adopter le thème du système (par défaut).

> Le délimiteur de ligne dans le texte affiché avec le QRCode est toujours une virgule, quel que soit le paramètre défini. Dans les données encodées dans le QRCode et celles copiées dans le presse-papiers, le délimiteur est celui que vous avez configuré.

En cliquant sur **Edit Config**, vous accédez à cet écran :  
![Éditeur de configuration](src/assets/images/editor_screen.png)

L'éditeur de texte permet de modifier le fichier `config.json`. Cliquez sur **Save** pour enregistrer les modifications.

Une fois que vous avez créé un fichier `config.json` personnalisé pour votre équipe, vous pouvez l'utiliser en compétition de deux façons :

1. Télécharger le fichier sur chaque tablette ou appareil utilisé et l'importer dans QRScout via le bouton "Upload Config".
2. Héberger le fichier sur un dépôt GitHub public et l'importer via "Load from URL".

Il est également possible de télécharger le `config.json` sur votre appareil ou de le réinitialiser à sa version par défaut.  
![Options de l'éditeur](src/assets/images/editor_options.png)

### Hébergement d'un fichier JSON de configuration personnalisé

Pour héberger votre fichier de configuration sur GitHub et le rendre accessible via GitHub Pages, procédez comme suit :

1. Créez un nouveau dépôt sur GitHub ou utilisez-en un existant.
2. Ajoutez votre fichier `config.json` au dépôt.
3. Activez GitHub Pages :
   - Allez dans l'onglet "Settings" du dépôt.
   - Faites défiler jusqu'à la section "GitHub Pages".
   - Sélectionnez la branche à utiliser (ex. : `main`).
   - Cliquez sur "Save".
4. Une fois GitHub Pages activé, votre fichier JSON sera disponible à une URL du type :  
   `https://<nom-utilisateur>.github.io/<nom-du-repo>/<chemin-du-config>.json`

Vous pourrez alors utiliser cette URL pour charger la configuration JSON dans QRScout.

## config.json

Le fichier `config.json` configure les champs du formulaire QRScout, le titre de la page et le caractère délimitant les données du QRCode.

La structure de base de `config.json` est la suivante :

### Racine :

- `$schema` : Référence au schéma utilisé par `config.json` (ne pas modifier).
- `title` : Titre de l'onglet de la page.
- `page_title` : Titre affiché en haut de la page QRScout.
- `delimiter` : Délimiteur utilisé dans le QR code.
- `sections` : Tableau contenant les sections/colonnes du formulaire.

### Sections :

- `name` : Nom de la section/colonne.
- `fields` : Tableau de champs décrivant les entrées du formulaire.

### Champs individuels :

- `title` : Nom du champ.
- `type` : Type d'entrée parmi `"text"`, `"number"`, `"boolean"`, `"range"`, `"select"`, `"counter"`, `"image"` ou `"timer"`.
- `required` : Boolean indiquant si le champ est obligatoire.
- `code` : Identifiant unique en camelCase.
- `disabled` : Boolean indiquant si le champ est désactivé.
- `formResetBehavior` : Comportement lors de la réinitialisation du formulaire :
  - `reset` : Réinitialise le champ.
  - `preserve` : Conserve la valeur.
  - `increment` : Incrémente la valeur selon les paramètres du champ.
- `choices` : Liste de choix possibles sous forme de clés/valeurs.

Exemple :

```json
"choices": {
    "1": "Première option",
    "2": "Deuxième option"
}
