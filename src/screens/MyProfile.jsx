import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../global/colors';
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileimageQuery } from '../services/shopServices';
import { clearUser } from '../features/User/UserSlice';
import { truncateSessionTable } from '../persistence';
import AddButton from '../components/AddButton';


export default function MyProfile ({ navigation }) {

      const dispatch = useDispatch();
      const {image, localId, user} = useSelector((state) => state.auth.value);
      const {data: imageFromBase} = useGetProfileimageQuery(localId);

      const launchCamera = async () => {
        navigation.navigate("Image Selector");
      };

      const defaultImageRoute = "../../assets/user.png";

      const signOut = async () => {
        try {
          const response = await truncateSessionTable()
          console.log(response)
          dispatch(clearUser())
        } catch (error) {
          console.log({errorSignOutDB: error})
        }
      }

  return (
    <View style={styles.container}>
      {imageFromBase || image ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require(defaultImageRoute)}
        />
      )}
      <Text style={styles.text}>Email: {user}</Text>
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || image
            ? "Cambiar foto de perfil"
            : "Agregar foto de perfil"
        }
      />
      <AddButton onPress={signOut} title="Cerrar sesión" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.gray100
  },
  img: {
    marginVertical: 25,
    height: 200,
    width: 200,
    borderRadius: 100
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.red,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10
  },
  text: {
    backgroundColor: colors.red,
    color: colors.white,
    fontSize: 18,
    padding: 8,
    margin: 10,
    width: "75%",
    fontFamily: "roboto",
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
  }
});
