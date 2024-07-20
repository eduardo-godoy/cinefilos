import { Pressable, StyleSheet, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { colors } from "../global/colors"
import { useSignUpMutation } from "../services/authService"
import { useDispatch } from "react-redux"
import { setUser } from "../features/User/UserSlice"
import { registerValidations } from "../validations/registerValidations"

import SubmitButton from "../components/SubmitButton"
import InputForm from "../components/InputForm"

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [errorMail, setErrorMail] = useState("")
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      )
    }
  }, [result])

  const onSubmit = () => {
    try {
      registerValidations.validateSync({ email, password, confirmPassword })
      triggerSignUp({ email, password, returnSecureToken: true })
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err.message)
          break;
        case "password":
          setErrorPassword(err.message)
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message)
          break;
        default:
          break;   
      }
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        <InputForm
          placeholder="Ingrese su Email"
          onChange={setEmail}
          error={errorMail}
          isSecure={true}
        />
        <InputForm
          placeholder="Ingrese su contraseña"
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          placeholder="Repita su contraseña"
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Registrarse" />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable style={styles.subLink2} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Register

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
    gap: 25,
    padding: 30
  },
  title: {
    color: colors.red,
    fontSize: 50,
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
})
