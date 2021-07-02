import { guardarSession,obtenerSession,removeSession } from '../session'
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'

const axios = require('axios');

export const iniciarSesion = (email, password, store,toast,setLoading) => {
  const { cargarUsuario } = store
  var raw = {
    "email": email,
    "password": password
  }
  console.log( ENTRYPOINT+"auth/login")
  let url = ENTRYPOINT+"auth/login"
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body:raw,
    headers: { 'Accept': 'application/json' }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      let user={
        user:response.user,
        token: response.token
      }
      let encrypt= encriptarJson(JSON.stringify(user))
      cargarUsuario(encrypt)
      if(response.user.type_user=="asessor"){
        guardarSession(encrypt);
        setLoading(false)
       // toast(response.message,'success')
      }else{
        toast("Tipo de usuario no permitido",'error')
        setLoading(false)
      }
     }else{
      toast(response.message,'error')
      setLoading(false)
     }
    })
    .catch((error) => {
      console.log(error)
      toast("Error de red",'error')
      setLoading(false)
      


    });
}
export const cerrarSesion = (store,toast,setLoading) => {
  const { usuario,logout} = store

  let url = ENTRYPOINT+"logout"
  let setting = {
    method: "POST",
    url: url,

    headers: {
       'Accept': 'application/json',
      'Authorization':'Bearer '+JSON.parse(desencriptarJson(usuario)).token
      }

  };

  setLoading(true)
  axios(setting)
    .then((res) => {
      logout()
      removeSession()
   
      toast(res.data.message,"success")
      setLoading(false)

    })
    .catch((error) => {

      setLoading(false)
      toast("Error de red","error")

   
    });
}
