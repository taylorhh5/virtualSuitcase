import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './store/Index'
import Navigation from './Navigation/Navigation';
import Toast from 'react-native-toast-message';

const { store, persistor } = reduxStore();

const App: React.FC = () => {
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
