import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "./Home";
import MovieDetails from "./MovieDetails";

const Stack = createNativeStackNavigator();

const Domains = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movie" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Domains;
