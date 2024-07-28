import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../global/colors";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";


export default function Search ({ onSearch = () => {} }) {
  
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>
      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome5 name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 4,
    width: "90%",
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    color: colors.black,
    borderRadius: 10,
  }
});
