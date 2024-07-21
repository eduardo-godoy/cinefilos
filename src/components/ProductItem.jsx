import { Image, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";


import { useDispatch } from "react-redux";
import { setItemSelected } from "../features/Shop/ShopSlice";

const ProductItem = ({
  product,
  navigation
}) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setItemSelected(product.title))
    navigation.navigate("ItemDetail", { productoId: product.id });
  }

  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable style={styles.pressable} onPress={handleNavigate}>
        <Image
          style={styles.image}
          source={{ uri: product.image }}
          resizeMode="cover"
        />
        <Text style={styles.textCategory}>{product.title}</Text>
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  additionalStylesCard: {
    height: 425,
    width: 300,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    flex: 1,
  }, 
  image: {
    height: 350,
    width: "85%",
    borderRadius: 8,
  },
  textCategory: {
    fontSize: 20,
    color: colors.black,
    width: '100%',
    fontFamily: "roboto",
    textAlign: "center",
    padding: 15
  },
  pressable : {
    width: "100%",
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});
