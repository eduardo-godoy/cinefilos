import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { useState, useEffect } from "react";
import { colors } from "../global/colors";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { insertSession } from "../persistence";
import { loginValidations } from "../validations/loginValidations";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";


export default function Login ({ navigation }) {

  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerSignIn, result] = useSignInMutation();

  
  useEffect(() => {
    if (result?.data && result.isSuccess) {
      (async () => {
        try {
          if (Platform.OS !== "web") {
            await insertSession({
              email: result.data.email,
              localId: result.data.localId,
              token: result.data.idToken,
            });
          }
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [result]);

  useEffect(() => {
    if(result.isError) {
      let message = result.error.data.error.message
      message = message.split(" ")[0]
        switch (message) {
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            setErrorPassword("Ha ingresado la contraseña mal demasiadas veces")
          break;
          case "INVALID_LOGIN_CREDENTIALS":
            setErrorPassword("La contraseña ingresada es incorrecta")
          break;
          default:
          break;
        }
      }
  }, [result]);

  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("");
      loginValidations.validateSync({ email, password }, { abortEarly: false })
      triggerSignIn({ email, password, returnSecureToken: true })
      } catch (error) {
          error.inner.forEach(e => {
            switch (e.path) {
              case "email":
                setErrorMail(e.message)
              break;
              case "password":
                setErrorPassword(e.message)
              break;
              default:
              break;
          };
      });
    };
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <MaterialIcons name="local-movies" size={80} color="red" />
        <Text style={styles.title}>Cinéfilos</Text>
        <Text style={styles.title2}>Iniciar sesión</Text>
        <InputForm placeholder="Ingrese su Email" onChange={setEmail} error={errorMail} isSecure={false} />
        <InputForm placeholder="Ingrese su contraseña" onChange={setPassword} error={errorPassword} isSecure={true}/>
        <SubmitButton onPress={onSubmit} title="Ingresar"/>
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>
        <Pressable style={styles.subLink2} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black
  },
  container: {
    width: "90%",
    height: "auto",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 20,
    padding: 30
  },
  title: {
    color: colors.red,
    fontSize: 60,
    fontWeight: "bold"
  },
  title2: {
    color: colors.red,
    fontSize: 40,
    fontWeight: "bold"
  },
  sub: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold"
  },
  subLink2: {
    backgroundColor: colors.red,
    borderRadius: 6,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "60%"
  },
  subLink: {
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    fontWeight: "bold"
  }
});
