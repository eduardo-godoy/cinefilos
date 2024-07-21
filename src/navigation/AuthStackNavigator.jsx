import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'



const Stack = createNativeStackNavigator()
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Signup" />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator

