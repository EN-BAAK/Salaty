import React from 'react';
import DataProvider from './src/context/DataProvider';
import { NavigationContainer } from '@react-navigation/native';
import Stack from "./src/navigation/AppNavigator"

function App(): React.JSX.Element {

  return (
      <DataProvider>
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </DataProvider>
  );
}

export default App;
