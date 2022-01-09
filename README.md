# Vai Movie

## About

This is the Vai Movie app, an app to search for movies or shows, that allows the user to:

- See more details of the searched movie or tv show;
- Load more movies/tv shows on the end of the list, as available;
- Filter the movies/tv shows searched by year;
- Set movie/tv show as favourite;
- Access a profile screen, where he/she can sign in with Google Account, and see the movies/tv shows setted as favourites.

The app was built with:

- React Native;
- Typescript;
- Styled-Components;
- Axios;
- Redux;
- and other techs.

The design for this app was inspired by: https://dribbble.com/shots/15130805-Cinema-Booking-App

## How to run the project

- Clone this repository using `git clone git@github.com:wgsquayson/vaimovie.git`;
- On the project folder, run `yarn` or `npm install` to install the dependencies needed to run this project, according to your package manager;
- Run the command `cp .env.example .env` to create the `.env` file, open it and fill `X_RAPID_API_KEY=` with your `x-rapidapi-key` that can be created [here](https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative/), and save the file;
- If you're going to run this project on iOS Simulator, be sure to run `cd ios`, `pod install` and `cd ..` to install pods;
- Run `yarn ios` || `npm run ios` to run the project on iOS Simulator or `yarn android` || `npm run android` to run the project on the android emulator;
- Run `yarn start` on the same folder to start the metro bundler if not started.

## Screenshots

### Home screen (signed out/signed in/year filter (on pressing the calendar icon))

<p align="center">
  <img src="https://user-images.githubusercontent.com/43099794/148671617-5a0b9986-bce2-4efb-ad29-12ba2699f201.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148671607-04337eda-a39a-4b54-b4e8-ef62df59d46c.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148671629-a4794e6b-958c-471f-8621-4ed39444414b.png" height="500">
</p>

### Movie/Show details screen (not favourite/favourite)

<p align="center">
  <img src="https://user-images.githubusercontent.com/43099794/148667882-ccbddfce-b657-41db-9d28-b3b90ccc4ed9.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148667887-20490d24-881f-4a0b-bfcd-19eecf947b19.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148668052-7462b32e-6ffa-499f-8143-15874e4e6231.png" height="500">
</p>

### User profile screen (signed out/signed in/with favourites)

<p align="center">
  <img src="https://user-images.githubusercontent.com/43099794/148667934-bb86cb89-3898-4bcd-af4e-5a3b6e7251b9.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148667941-8724e8c7-36b8-4585-b9ae-6105be8e928d.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148667988-98005f1d-c1be-43b9-b343-8b65dfd50884.png" height="500">
</p>
