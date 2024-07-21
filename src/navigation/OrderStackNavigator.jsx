import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from "../screens/Order";

const Stack = createNativeStackNavigator();

export default function OrderStackNavigator () {
  return (
    <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderScreen" component={Order} />
    </Stack.Navigator>
  );
};
