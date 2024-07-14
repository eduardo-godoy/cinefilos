import { Pressable, StyleSheet, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { colors } from "../global/colors"
import { useSignInMutation } from "../services/authService"
import { useDispatch } from "react-redux"
import { setUser } from "../features/User/UserSlice"
import { insertSession } from "../persistence"

import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const [triggerSignIn, result] = useSignInMutation() 

  useEffect(()=> {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken
      }).then((response)=> {
        console.log(response)
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        );        
      }).catch(err => {
        console.error(err)
      })
    }
  }, [result])

  const onSubmit = ()=> {
    triggerSignIn({email, password, returnSecureToken: true})
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.title2}>Iniciar sesión</Text>
        <InputForm placeholder="Ingrese su Email" onChange={setEmail} error={""} />
        <InputForm placeholder="Ingrese su contraseña" onChange={setPassword} error={""}isSecure={true}/>
        <SubmitButton onPress={onSubmit} title="Ingresar"/>
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>
        <Pressable style={styles.subLink2} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrate</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange
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
    color: colors.gray,
    fontSize: 60,
    fontWeight: "bold"
  },
  title2: {
    color: colors.gray,
    fontSize: 40,
    fontWeight: "bold"
  },
  sub: {
    fontSize: 20,
    color: colors.gray,
    fontWeight: "bold"
  },
  subLink2: {
    backgroundColor: colors.orange,
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
