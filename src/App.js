// import React, { useEffect } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Trip, AddTrip } from './screens';
import { DbContextProvider } from "./context/DbContext";
// import { initDatabase } from "./services/db-service";

const Stack = createStackNavigator();


const App = () => {
  // useEffect(function () {
  //   async function init() {
  //     await initDatabase();
  //   }
  //   init();
  // }, []);
  return (
    <DbContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Trip" component={Trip} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
        </Stack.Navigator>
      </NavigationContainer>
    </DbContextProvider>
  );
};
export default App;
