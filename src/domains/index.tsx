import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import MovieDetails from "./MovieDetails";
import UserProfile from "./UserProfile";

export type DomainsStackParamList = {
  Home: undefined;
  MovieDetails: {
    imdbID: string;
  };
  UserProfile: undefined;
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
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Domains;
