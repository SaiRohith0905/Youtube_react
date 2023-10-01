import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import menuBarContext from "./Utils/menuBarContext";
import { useState } from "react";
import store from "./Utils/Store";
import { Provider } from "react-redux";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import floatMenuBarContext from "./Utils/floatMenuBarContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  const [navbarconfig, setNavBarConfig] = useState(true);
  const [floatNavBarConfig, setFloatNavBarConfig] = useState(false);
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <floatMenuBarContext.Provider
          value={{ floatNavBarConfig, setFloatNavBarConfig }}
        >
          <menuBarContext.Provider value={{ navbarconfig, setNavBarConfig }}>
            <div className="">
              <Header />
              <Body />
            </div>
          </menuBarContext.Provider>
        </floatMenuBarContext.Provider>
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
