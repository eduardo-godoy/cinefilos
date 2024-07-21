import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../global/colors';
import Feather from '@expo/vector-icons/Feather';


export default function CartItem ({ cartItem }) {
  
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.title}
        </Text>
        {cartItem.quantity <= 1 ? 
            <Text style={styles.text}>
             {cartItem.quantity} unidad
            </Text> :
            <Text style={styles.text}>
            {cartItem.quantity} unidades
           </Text>  
            }
        <Text style={styles.text2}>
          Precio x unidad: ${cartItem.price}
        </Text>
          {cartItem.quantity > 1 ? 
            <Text style={styles.text2}>
              Subtotal: ${cartItem.price * cartItem.quantity}
            </Text> : 
            null}
      </View>
      <Feather name="x" style={styles.trash} size={35} color="black"  />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  text: {
    fontFamily: "roboto",
    fontSize: 22,
    color: colors.black
  },
  text2: {
    fontFamily: "roboto",
    fontSize: 18,
    color: colors.black
  },
  trash: {
    backgroundColor: colors.red,
    borderRadius: 50,
    padding: 2,
    color: colors.white
  }
});
