import { StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { colors } from "../global/colors"

export default InputForm = ({ placeholder, onChange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");
  const onChangeText = (text) => { setInput(text); onChange(text) }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={placeholder}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    width: "90%",
    fontSize: 20,
    fontWeight: "bold"
  },
  error: {
    paddintTop: 2,
    fontSize: 16,
    color: "red",
  },
  input: {
    width: "90%",
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.gray,
    padding: 2,
    fontSize: 18,
  },
})
