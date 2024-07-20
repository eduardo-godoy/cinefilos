import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../global/colors"

export default SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "60%"
  },
  text: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "bold"
  }
})
