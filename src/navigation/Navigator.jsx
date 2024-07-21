import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSession } from "../persistence";
import { setUser } from "../features/User/UserSlice";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export default function Navigator () {
  
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(()=>{
    (async () => {
      try {
        const response = await getSession();
        if(response.rows.length){
          const user = response.rows._array[0]
          dispatch(setUser({
            email: user.email,
            localId: user.localId,
            idToken: user.token,
          }))
        }
      } catch (error) {
        console.error(error)
      };
    });
  });

  return (
    <NavigationContainer>
      {user ? <BottomTapNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

