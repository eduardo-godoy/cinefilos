import { StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { colors } from "../global/colors"

export default function InputForm ({ placeholder, onChange, error , isSecure, value }) {

  const [input, setInput] = useState("");

  const onChangeText = (text) => {
      setInput(text)
      onChange(text)
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={placeholder}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  subtitle: {
    width: "90%",
    fontSize: 20,
    fontWeight: "bold"
  },
  error: {
    paddintTop: 2,
    fontSize: 18,
    fontFamily: "roboto",
    color: colors.red,
    textAlign: "center"
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    backgroundColor: colors.gray100,
    borderRadius: 5,
    padding: 2,
    fontSize: 22
  },
});
