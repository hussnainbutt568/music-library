import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import SignIn from "./login";
import Store from "./Redux/Store";
import Routers from "./router";

function App() {
  const loggedIn = localStorage.getItem("login");

  return (
    <Provider store={Store}>
      <div className="App">
        {loggedIn === null ? <SignIn /> : <Routers />}

      </div>
    </Provider>
  );
}

export default App;
