import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Domains from "./src/domains";

import { store, persistor } from "./src/store";

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "782549800264-rg542b54onshq736kio1pg9m8klvln4s.apps.googleusercontent.com",
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Domains />
      </PersistGate>
    </Provider>
  );
};

export default App;
