import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Linking,Modal } from 'react-native'

import Initializer from '../../store/Initializer'
import { obtenerFileData ,  downloadFiles,} from "../../utils/API/clients.js";
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { obtenerOpciones} from '../../utils/API/precalificator'
import {ENTRYPOINT} from '../../config/API'
import Subidos from './components/Subidos'

export default function Precalificator({ navigation, route }) {
    const { id,status,dni,dependence,dependenceS } = route.params;
    const [isPanelActive, setIsPanelActive] = useState(false);

    const initializer = useContext(Initializer);
    const [data, setData] = useState({client:null,spouse:null});
    const [opciones,setOpciones] = useState([])
    const [colorA, setColorA] = React.useState("transparent");
    const [colorP, setColorP] = React.useState("transparent");
    const [colorR, setColorR] = React.useState("transparent");
    const [colorN, setColorN] = React.useState("transparent");


    useEffect(()=>{
     
        if(initializer.usuario!=null){
           
             obtenerOpciones(setOpciones,initializer);
        
        }
  

    

},[initializer.usuario])
    useEffect(() => {

        obtenerFileData(id, setData, initializer)
    }, [])
    React.useEffect(() => {
        if (opciones.length != 0) {
          setColorA(opciones[0].color.split(",")[1]);
          setColorP(opciones[0].color.split(",")[0]);
          setColorR(opciones[0].color.split(",")[2]);
          setColorN(opciones[0].color.split(",")[3]);
        }
      }, [opciones]);
      const obtenerColor = (valor) => {
        if (valor == "Aprobado") {
          return colorA;
        } else if (valor == "Revision") {
          return colorR;
        } else if (valor == "Negado") {
          return colorN;
        } else {
          return colorN;
        }
      };
      const descargar = () => {
      
        Linking.openURL(ENTRYPOINT+"precalificator/download?client_id="+id+'&dni='+dni)
     
      };
     console.log(data)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Datos del precalificador</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1, marginTop: 15, width: '100%', alignItems: 'center' }}>
            <View style={{flexDirection:'row',width:'100%',paddingHorizontal: '2%',}}>
                <TouchableOpacity
         onPress={()=>setIsPanelActive(true)}
         style={{ borderRadius: 10, marginBottom:10,marginRight:10, backgroundColor: '#E8505C', padding: 13 }}
     >
         <Text style={{ color: 'white', fontWeight: 'bold',  }}><Feather name="eye" size={18} color="white" />   Ver subidos</Text>
     </TouchableOpacity>
     <TouchableOpacity  
     onPress={descargar}
        
         style={{ borderRadius: 10, marginBottom:10,backgroundColor: '#323B62', padding: 13 }}
     >
         <Text style={{ color: 'white', fontWeight: 'bold',  }}><Feather name="file-text" size={18} color="white" />  Exportar pdf</Text>
     </TouchableOpacity>

                </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: '2%', marginBottom: 10, textAlign: 'left', width: '100%',color:obtenerColor(status) }}>{status}</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 18, paddingHorizontal: '2%', marginBottom: 10, textAlign: 'left', width: '100%' }}>Cliente</Text>

              
                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Buró de crédito: {data.client != null ? data.client.buro : "0"}</Text>
                    </View>
                </View>

                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Precalificación hipotecaria: ${data.client != null ? Number(data.client.precalification).toFixed(2) : "0"}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Mecanizado: ${data.client != null ? Number(data.client.mecanizado).toFixed(2) : "0"}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Declaración del IVA: ${data.client != null ? Number(data.client.iva).toFixed(2) : "0"}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Declaración de imp. renta: ${data.client != null ? Number(data.client.rent).toFixed(2) : "0"}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="info" size={20} color="black" />
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Obligaciones: ${data.client != null ? data.client.obligation : "0"}</Text>
                    </View>
                </View>
                {
                    data!=null?
                    data.spouse!=null?

                    <View style={{width:'100%'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingHorizontal: '2%', marginBottom: 10, textAlign: 'left', width: '100%' }}>Cónyuge</Text>

                        
                        <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="info" size={20} color="black" />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Buró de crédito: {data.spouse != null ? data.spouse.buro : "0"}</Text>
                            </View>
                        </View>

                     
                        <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="info" size={20} color="black" />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Mecanizado: ${data.spouse != null ? Number(data.spouse.mecanizado).toFixed(2) : "0"}</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="info" size={20} color="black" />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Declaración del IVA: ${data.spouse != null ? Number(data.spouse.iva).toFixed(2) : "0"}</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="info" size={20} color="black" />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Declaración de imp. renta: ${data.spouse != null ? Number(data.spouse.rent).toFixed(2) : "0"}</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: '2%', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="info" size={20} color="black" />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>Obligaciones: ${data.spouse != null ? data.spouse.obligation : "0"}</Text>
                            </View>
                        </View>
                    </View>
:null   :null
                }
              
              
                    <Subidos  dependence={dependence}  dependenceS={ dependenceS} client_id={id} spouse_id={ data.spouse!=null? data.spouse_id:0} isPanelActive={isPanelActive} setIsPanelActive={setIsPanelActive}/>
                  
            
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#323B62',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 55
    }
});
