# Plotline Assignment Google Maps Mini Clone


## Features

1. Find routes between two places.
2. Choose your desired travel mode.
3. Auto-suggestions for places to select as origim and destination.
4. Error handling for cases like route not found, api error et cetera.
5. Change map view to satellite and go full screen.

## Manual Tests

Please find manual tests results file in the root folder.

## Readability

All functions, class names, constants and variables are defined with readable names according to their use. The code is refractored, and the API key is hidden using .env file.

## Structure

1. All concerned files can be found inside src folder, all styling related code can be found in App.css. 
2. Config.js exports the API KEY's constant.
3. App.js contains the main code of the application, including the map and other features.

## Deployment

Deployment is done on Netlify, and live site can be found at link : [https://plotline-assignment-shubh.netlify.app/](https://plotline-assignment-shubh.netlify.app/)

## Run on your system

1. Clone the project on your system.
2. Run `npm install` in the project directory.
3. After successful installation of node modules run `npm start`, the app will start in development mode on link [http://localhost:3000](http://localhost:3000)
