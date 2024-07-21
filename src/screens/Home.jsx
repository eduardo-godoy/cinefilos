import { StyleSheet, View, FlatList } from "react-native";
import { colors } from "../global/colors";
import { useGetCategoriesQuery } from "../services/shopServices";
import CategoryItem from "../components/CategoryItem";


export default function Home ({ navigation }) {

  const {data: categories} = useGetCategoriesQuery();
  
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(category) => category}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: colors.gray100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
