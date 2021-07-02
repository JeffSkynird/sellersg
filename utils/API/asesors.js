
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerValorCotizaciones = (data,setData) => {


  console.log("uscando")
console.log(data)
  let url = ENTRYPOINT+"client/get_cotization";
  let setting = {
    method: "GET",
    url: url,
    params:data,
    headers: { Accept: "application/json"},
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      console.log("AQUI")
      console.log(response)
      if(response.hasOwnProperty('cantidad_cotizaciones')){
       
        setData(response.cantidad_cotizaciones);
      }
    })
    .catch((error) => {
console.log(error)
    });
};

export const obtenerReservasAsesor = (data,setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"asesor/get_reservations"
  let setting = {
    method: "GET",
    url: url,
    params:data,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
 
     
        if(response.hasOwnProperty('data_cumplen_asesores')){
          setData(response.data_cumplen_asesores[0].reservas_activas);
        }
      
       
      } else {
      

      }
    })
    .catch((error) => {
 

     
    });
};
/* export const obtenerValorCotizaciones = (data,setData) => {


 

  let url = ENTRYPOINT+"client/get_cotization";
  let setting = {
    method: "GET",
    url: url,
    params:data,
    headers: { Accept: "application/json"},
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      setData(response.cantidad_cotizaciones)
      if(response.hasOwnProperty('cantidad_cotizaciones')){
        setData(response.cantidad_cotizaciones);
      }
    })
    .catch((error) => {

       
    });
} */;
export const obtenerKpisR = (setData1,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  
let url = ENTRYPOINT+"kpis_performance?asesor_id="+id_asesor+"&min=2020-3-1&max=2022-3-31"
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
     console.log(response)
      setData1({citations1:response.citas,citations2:response.citas_efectivas,calls1:response.calls,calls2:response.calls_efectivas})
     
 

   }else{
    console.log(response)
   }
  })
  .catch((error) => {
    console.log(error)


  });
}
export const obtenerDatosAsesor= (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"asessor/get_by_id?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      },
    };
    

    axios(setting)
      .then((res) => {
        let response = res.data;
        console.log(response)
        if (response.type != "error") {
          console.log(response.data)
          setData({...response.data.asesor,email:response.data.email});
       
         
        } else {
        
     
        }
      })
      .catch((error) => {
      
  
       
      });
  };