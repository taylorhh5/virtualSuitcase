import { useEffect } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './store/Index'
import Navigation from './Navigation/Navigation';
import Toast from 'react-native-toast-message';
import BootSplash from "react-native-bootsplash";

const { store, persistor } = reduxStore();

const App: React.FC = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true })
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}

export default App;
