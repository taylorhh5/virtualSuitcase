import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './store/Index'
import Navigation from './Navigation/Navigation';
const { store, persistor } = reduxStore();


const App: React.FC = () => {
  const isLoggedIn = true;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
