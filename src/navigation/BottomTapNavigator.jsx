import { StyleSheet, View } from 'react-native';
import { colors } from '../global/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from "@expo/vector-icons";
import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import MyProfileStackNavigator from "./MyProfileStackNavigator";
import Header from '../components/Header';


const Tab = createBottomTabNavigator()

export default function BottomTapNavigator () {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Tienda"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <FontAwesome5 name="shopping-bag" size={24} color={"white"} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <FontAwesome5 name="shopping-cart" size={24} color={"white"} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ordenes"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <FontAwesome5 name="receipt" size={24} color={"white"} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi perfil"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <FontAwesome5 name="user-alt" size={24} color={"white"} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.black,
    height: 80,
    fontFamily: "roboto"
  }
});
