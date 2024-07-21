import { StyleSheet, Text, View, FlatList } from "react-native";
import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";


const Order = () => {

  const { user } = useSelector((state) => state.auth.value);
  const { data: OrderData, isLoading } = useGetOrdersByUserQuery({user});
  //if(!isLoading){
    console.log(OrderData)
  //}

  return (
    <View style={styles.container}> 
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem) => orderItem}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100
  }
});
