# Vai Movie

## About

This is the Vai Movie app, an app to search for movies or shows, that allows the user to:

- See more details of the searched movie or show;
- Load more movies/shows on the end of the list, as available;
- Filter the movies/shows searched per year;
- Set movie as favourite;
- Access profile, where he/she can sign in with Google Account, and see the movies/shows setted as favourites.

The app was built with:

- React Native;
- Typescript;
- Styled-Components;
- Axios;
- Redux.

The design for this app was inspired by: https://dribbble.com/shots/15130805-Cinema-Booking-App

## How to run the project

- Clone this repository using `git clone git@github.com:wgsquayson/vaimovie.git`;
- On the project folder, run `yarn` or `npm install` to install the dependencies needed to run this project, according to your package manager;
- Run the command `cp .env.example .env` to create the `.env` file, open it and fill `X_RAPID_API_KEY=` with your `x-rapidapi-key` that can be created [here](https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative/), and save the file;
- If you're going to run this project on iOS Simulator, be sure to run `cd ios`, `pod install` (or `arch -x86_64 pod install` if using Mac M1 processor) and `cd ..` to install iOS pods;
- Run `yarn ios`  || `npm run ios` to run the project on iOS Simulator or `yarn android` || `npm run android` to run the project on the android emulator (put `arch -x86_64` before the commands if any problem happens on Mac M1);
- Run `yarn start` on the same folder to start the metro bundler if not started.

## Screenshots

### Home screen (signed out/signed in/year filter (on pressing the calendar icon))

<p align="center">
  <img src="https://user-images.githubusercontent.com/43099794/148667770-6bd3aa82-4bac-452c-9529-b49221d598cd.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148667842-0cafc2b8-87eb-4f28-88b6-71e966714a96.png" height="500">
  <img src="https://user-images.githubusercontent.com/43099794/148668010-ac68940c-018c-42bc-85d7-fe260f123cb6.png" height="500">
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





