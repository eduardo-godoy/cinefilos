import { StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../global/colors";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/Shop/ShopSlice";
import Card from "./Card";


export default function CategoryItem ({ category, navigation }) {

  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate("ItemListCategory", { category });
  };

  return (
    <Card style={styles.cardContainer}>
      <Pressable style={styles.Pressable} onPress={handleNavigate}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};


const styles = StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10, 
      marginVertical: 10,
      backgroundColor: colors.red,
      borderRadius: 5,
      height: 100,
      width: "95%",
      margin: "auto"
    }, 
    text: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.white,
      fontFamily: "roboto"
    },
    Pressable: {
      width: "100%"
    }
});
