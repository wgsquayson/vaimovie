import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import MovieDetails from "./MovieDetails";
import FavouriteMovies from "./FavouriteMovies";

export type DomainsStackParamList = {
  Home: undefined;
  MovieDetails: {
    imdbID: string;
  };
  FavouriteMovies: undefined;
};

const Stack = createNativeStackNavigator<DomainsStackParamList>();

const Domains = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="FavouriteMovies" component={FavouriteMovies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Domains;
