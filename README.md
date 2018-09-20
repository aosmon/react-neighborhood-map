Neighborhood Map (React)
===============================

## Project Overview:
**Neighborhood Map** project is a part of the Udacity Front-End Web Developer nanodegree program. 
Goal of the project was to develop a single page application using React featuring a map of the neighborhood with added map functionality including highlighted locations, third-party data about those locations and various ways to browse the content.
This project was built from scratch, without any existing starter code to rely on.

## Project Requirements
**Develop an application using React UI library.**
**Add additional functionality to this application**, including: map markers to identify selected locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations.
**Research and implement third-party APIs** that provide additional information about each of these locations.
**All data API's used in the application should load asynchronously**, and errors should be handled gracefully.
**Application uses a service worker to cache responses** to requests for site assets. Visited pages are rendered when there is no network access.

## References
- React API https://reactjs.org
- Google Maps API https://cloud.google.com/maps-platform/
- FourSquare API https://developer.foursquare.com

## How to run in the development mode
1. Fork and clone this repository.
2. Open terminal in the project directory.
3. Start the development server with `yarn start`.
4. A new browser window should automatically open. If not, open any browser and visit the site: `http://localhost:3000`.

## How to run in the production mode (required for the serviceworker to cache files and run offline)
1. Fork and clone this repository.
2. Open terminal in the project directory.
3. Create a production build using `yarn build`.
3. Serve application with a static server
  -  `yarn global add serve`
  - `serve -s build`
4. A new browser window should automatically open. If not, open any browser and visit the site: `http://localhost:5000`.
