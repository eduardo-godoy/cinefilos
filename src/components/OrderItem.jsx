import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../global/colors";


export default function OrderItem ({ order }) {

  const total = order.items.reduce(
    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
    0
  );

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Creación: {new Date(order?.createdAt || null).toLocaleString()}
        </Text>
        <Text style={styles.text2}>Total: ${total}</Text>
      </View>
      <Feather name="search" size={10} color="black" />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.gray100,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  text: {
    width: "100%",
    fontSize: 17,
    color: "black",
    fontFamily: "roboto"
  },
  text2: {
    fontSize: 19,
    color: "gray",
    fontFamily: "roboto"
  },
});
