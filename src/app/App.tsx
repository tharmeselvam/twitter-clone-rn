import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { RootNavigator } from './RootNavigator';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../store';
import { useEffect } from 'react';
import { checkAuth } from '../store/slices/authSlice';

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
      </NavigationContainer>
    </Provider>
  );
}

export default App;
