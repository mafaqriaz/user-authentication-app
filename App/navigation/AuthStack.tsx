import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f8f9fa' },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;