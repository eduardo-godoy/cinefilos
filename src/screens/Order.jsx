import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';
import OrderItem from "../components/OrderItem";
import { useGetOrdersQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";


const Order = () => {

  const {localId} = useSelector((state) => state.auth.value)    
  const {data: orders, isSuccess} = useGetOrdersQuery(localId)
  const [ordersFiltered, setOrdersFiltered] = useState()

  useEffect(()=> {
    if (isSuccess) {
      try{ const responseTransformed = Object.values(orders)
        const ordersFiltered = responseTransformed.filter(order => order.user === localId)
        setOrdersFiltered(ordersFiltered)}catch{

        }
     
    }
  }, [orders, isSuccess, localId])

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

export default Order;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100
  }
});
