import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import MovieDetails from "./MovieDetails";

export type DomainsStackParamList = {
  Home: undefined;
  MovieDetails: {
    imdbID: string;
  };
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Domains;
