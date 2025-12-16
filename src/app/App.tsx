import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './RootNavigator';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../store';
import { useEffect } from 'react';
import { checkAuth } from '../store/slices/authSlice';
import Toast from 'react-native-toast-message';

function AppBootstrap() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(checkAuth());
  }, [dispatch]);

  return <RootNavigator />
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppBootstrap />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
