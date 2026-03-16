# Contexte

On considère un backend exposant un endpoint HTTP sur `localhost:5000`. Cet endpoint fournit une liste d'objets contenant les propriétés :
- name: nom unique du drone
- position: array de 3 floats exprimant la position en XYZ (tous aux alentours de l'origine 0,0,0)
- status: une description du statut du drone

Par défaut, le backend renvoie 500 objets drones. Le statut et la position de ces derniers évoluent à chaque nouvel appel HTTP.

## Lancer le backend

Le backend est une application Flask basique. Elle peut être exécutée via python ou en tant qu'image docker comme décrit ci-dessous :

- Se déplacer dans le dossier `backend-mock`
- Builder l'image docker avec `docker build -t backend-mock .`
- Lancer un container docker en bindant le port 5000 avec `docker run -p 5000:5000 backend-mock`

Une fois l'image docker lancée, une requête GET sur `localhost:5000` renverra une liste d'objets drones.

## Boilerplate frontend

Dans le dossier `vue-frontend-boilerplate`, lancer `npm i` puis `npm run serve` pour lancer le boilerplate VueJS. Ce dernier est alors exposé sur `localhost:8081`.

La landing page du boilerplate indique les packages déjà utilisés et suggère quelques components pouvant être utilisés pour faire l'exercise.

# Exercice

L'objectif est de modifier le boilerplate VueJS pour proposer une vue carte affichant les informations relatives aux drones.

La forme de cette vue est laissée libre mais doit permettre de visualiser les positions des drones.
Elle doit simplement permettre de visualiser la position des drones et de distinguer ceux ayant un statut `OK` de ceux ayant un statut non nominal (dans notre cas: `LOST_LINK`, `BAD_CONFIG`, `MOTOR_KO` ou `LOW_BATTERY`).

Les informations relatives aux drones doivent par ailleurs se mettre à jour à intervalle régulier (par exemple tous les 5 secondes).