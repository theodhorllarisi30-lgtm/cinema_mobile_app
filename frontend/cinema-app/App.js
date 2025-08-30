import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen'; 
import CinemaList from './screens/CinemaList';
import ReservationScreen from './screens/ReservationScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';
import EditReservationScreen from './screens/EditReservationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cinemas" component={CinemaList} options={{ headerLeft: null }} />
        <Stack.Screen name="Reservations" component={ReservationScreen} />
        <Stack.Screen name="MyReservations" component={MyReservationsScreen} />
        <Stack.Screen name="EditReservation" component={EditReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
