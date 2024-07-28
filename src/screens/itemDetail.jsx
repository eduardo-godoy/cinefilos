import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import { colors } from "../global/colors";


export default function ItemDetail ({ route }) {

  const { productoId: idSelected } = route.params;
  const {data: product } = useGetProductByIdQuery(idSelected);
  const dispatch = useDispatch();

const handleAddCart = () => {
  dispatch(addCartItem({...product, quantity: 1}))
};

  return (
    <View>
      {product ? (
        <View style={ styles.mainContainer }>
          <Text style= { styles.title }>{product.title}</Text>
          <Image source={{ uri: product.image }} style={ styles.image } resizeMode="cover"/>
          <Text style={styles.price}>Genero: {product.category}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Precio:${product.price}</Text>
            <Pressable style={styles.button} onPress={handleAddCart}>
              <Text style={styles.cart}>Agregar al carrito</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal : 10,
    backgroundColor: colors.gray100,
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: 425,
    borderRadius: 10
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    fontFamily: "roboto",
    textAlign: "center",
    paddingBottom: 5
  },
  title: {
    fontSize: 25,
    fontFamily: "roboto",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    padding: 20,
    width: "100%",
    color: colors.white,
    borderRadius: 10
  },
  description: {
    fontSize: 16,
    textAlign: "justify"
  },
  cart: {
    fontFamily: "roboto",
    color: colors.white,
    textAlign: "center"
  }
});
