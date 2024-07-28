import { StyleSheet, View } from "react-native";
import { colors } from "../global/colors";


export default function Card ({ children, style }) {
  return (
    <View style={{...styles.container, ...style}}>
      {children}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: colors.gray100,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
