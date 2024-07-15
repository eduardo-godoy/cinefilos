import { object, string, ref } from "yup"

export const registerValidations = object().shape({
  email: string().required("Por favor ingrese un email").email("Ingrese un email válido"),
  password: string().required("Por favor ingrese una contraseña").min(6, "La contraseña debe tener un minimo de 6 caracteres"),
  confirmPassword: string().oneOf([ref("password"), null], "Las contraseñas no coinciden").required("Las contraseñas no coinciden")
})
