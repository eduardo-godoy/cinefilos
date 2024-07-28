import { FlatList, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../global/colors";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem.jsx";

export default function ItemListCategory ({ navigation, route }) {

  const [keyWord, setKeyword] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);

  const { category: categorySelected } = route.params;
  const {data: productsFetched, error: errorFetched, isLoading} = useGetProductsByCategoryQuery(categorySelected);
  
  useEffect(() => {
    if(!isLoading){
      const productsFiter = productsFetched.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()
      ));
      setProductsFiltered(productsFiter);
    }
  }, [keyWord, categorySelected, productsFetched, isLoading]);

  return (
    <View>
      <View style={styles.flatListContainer}>
        <Search onSearch={setKeyword} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productsFiltered}
          renderItem={({ item }) => (
            <ProductItem product={item} navigation={navigation}  style= { height="100%" }/>
          )}
          keyExtractor={(producto) => producto.id}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  text: {
    color: colors.red,
    flex: 1
  }
});
