import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Domains from "./src/domains";

import { store, persistor } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Domains />
      </PersistGate>
    </Provider>
  );
};

export default App;
