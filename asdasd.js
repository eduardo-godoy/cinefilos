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
        }  catch (error) {
          console.log(error);
        }
      })();
    }else if(result.isError) {
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
  }, [result])
  
  useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
        else if(result.isError) {
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
    }, [result])