import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";


export default function Order () {

  const {user} = useSelector((state) => state.auth.value);    
  const {data: orders, isSuccess} = useGetOrdersQuery(user);
  const [ordersFiltered, setOrdersFiltered] = useState();

  useEffect(()=> {
    if (isSuccess) {
      try{ 
        const responseTransformed = Object.values(orders);
        const ordersFiltered = responseTransformed.filter(order => order.user === user);
        setOrdersFiltered(ordersFiltered);
      }catch (error){
        alert(error);
      } 
    }
  }, [orders, isSuccess, user]);

  return (
    <View style={styles.container}> 
      <FlatList
        data={ordersFiltered}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100
  }
});
