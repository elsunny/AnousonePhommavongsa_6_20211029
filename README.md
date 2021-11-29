# Openclassrooms Projet 6  API avis gastronomique

Application web de critique des sauces piquantes.
Elle permet à des utilisateurs de se créer un compte, ils peuvent ensuite ajouter les sauces piquantes qui leurs plaisent en les notant.

## Pour démarrer le projet

Vous devez créer un fichier .env à la racine en suivant le modèle .env-exemple.  

Veuillez y initialiser les variables suivantes:
- DB_URI *( avec l'adresse complète d'accès à votre base de données)*
- JWT_SECRET *( avec la clef de votre token)*
- DB_SALT *( avec la sécurité à ajouter au mot de passe pour chaque mot de passe utilisateur)*

Lancer le server avec npm run devStart dans votre terminal.