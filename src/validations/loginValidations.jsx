import { object, string } from "yup"

export const loginValidations = object().shape({
  email: string().required("Por favor ingrese un email").email("Ingrese un email válido"),
  password: string().required("Por favor ingrese una contraseña").min(6, "La contraseña debe tener un minimo de 6 caracteres"),})