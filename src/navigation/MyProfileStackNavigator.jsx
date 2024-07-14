import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "../screens/MyProfile";
import ImageSelector from "../screens/ImageSelector";
import ListAddress from "../screens/ListAddress"; 

const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="My Profile" component={MyProfile} />
      <Stack.Screen name="Image Selector" component={ImageSelector} />
      <Stack.Screen name="List Address" component={ListAddress} />
    </Stack.Navigator>
  );
}

export default MyProfileStackNavigator
