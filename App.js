import { StyleSheet, View, StatusBar, Platform } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./src/store";
import Navigator from "./src/navigation/Navigator";

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    roboto: require("./assets/Roboto-Black.ttf")
  });

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator/>
      </Provider>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    fontFamily: "roboto"
  }
});
