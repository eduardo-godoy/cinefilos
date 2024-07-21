import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import { colors } from '../global/colors';
import CartItem from '../components/CartItem';


export default function Cart ({ navigation }) {

  const { user } = useSelector((state) => state.auth.value);
  const {items: CartData, total} = useSelector((state) => state.cart.value);
  const [triggerPostOrder] = usePostOrderMutation();

  const onConfirmOrder = () => {
    triggerPostOrder({items: CartData, user, total})
    navigation.navigate("Ordenes")
  };

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100,
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 30
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  Pressable: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 10
  },
  text: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "roboto",
    fontSize: 25
  }
});
