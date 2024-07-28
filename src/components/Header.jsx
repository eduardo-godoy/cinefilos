import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";


export default function Header ({ title }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.white,
    fontSize: 22,
    fontFamily: 'roboto'
  },
});
