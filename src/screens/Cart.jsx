import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import { colors } from '../global/colors';
import { clearCartItem } from "../features/Cart/CartSlice";
import CartItem from '../components/CartItem';


export default function Cart ({ navigation }) {

  const { localId } = useSelector((state) => state.auth.value);
  const {items: CartData, total} = useSelector((state) => state.cart.value);
  const [triggerPostOrder] = usePostOrderMutation();
  const dispatch = useDispatch();

  const onConfirmOrder = () => {
    const createdAt = new Date().toISOString()
    triggerPostOrder({items: CartData, user: localId, total,createdAt})
    dispatch(clearCartItem())
    navigation.navigate("Ordenes")
  };
  const cartRemoveAllItems = () => {
    dispatch(clearCartItem())
  };

  return (
    
    <View style={styles.container}>
      {CartData.length > 0 ? ( 
         <View style={styles.container2}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />
        }}
        keyExtractor={(producto) => producto.id}
      />
      <View style={styles.totalContainer}>
        <Pressable style={styles.Pressable} onPress={onConfirmOrder}>
          <Text style={styles.text}>Ckeckout</Text>
          <Text style={styles.text}>Total:$ {total}</Text>
        </Pressable>
        <Pressable style={styles.Pressable} onPress={cartRemoveAllItems}>
          <Text style={styles.text}>Vaciar carrito</Text>
        </Pressable>
      </View>
    </View>
      
    
    ) : (
      <View style={styles.view}>
        <Text style={styles.text2}>Aún no se han añadido productos al carrito...</Text>
      </View>
    )}
    
    </View>);
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100,
    justifyContent: "space-between",
    flex: 1,
  },
  container2: {
    flex: 1,
    paddingBottom: 150
  },
  totalContainer: {
    width: "100%",
    position: "absolute",
    bottom:  0,
    backgroundColor: colors.gray100
    
  },
  Pressable: {
    flexDirection: "column",
    width: "50%",
    height: 60,
    marginVertical: 10,
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "roboto",
    fontSize: 25
  },
  text2: {
    color: colors.black,
    fontFamily: "roboto",
    fontSize: 20
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colors.black,
    fontFamily: "roboto",
    fontSize: 20
  }
});
