import React, { useState, useEffect, useContext } from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import { View, TouchableOpacity, Text ,Dimensions,StyleSheet,Linking} from 'react-native'
import { tieneArchivos, enviarCotizacion } from "../../utils/API/clients";
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Initializer from '../../store/Initializer'
import { useToast } from 'react-native-styled-toast'
import Constants from 'expo-constants';
import {svg} from '../../assets/noValue2.js'
import { SvgXml } from 'react-native-svg';
const {width,height}= Dimensions.get('window')
import {

    cotizar,
 
    obtenerCotizacion,
    
  } from "../../utils/API/clients.js";
export default function Subidos({ navigation, route }) {
    const initializer = React.useContext(Initializer);
    const { dni,client_id } = route.params;
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast()
    const [link, setLink] = React.useState("");

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true, onlyLarge: true, onlySmall: false,
        showCloseButton: true,
        onClose: () => props.setIsPanelActive(false),
        onPressCloseButton: () => props.setIsPanelActive(false),
        // ...or any prop you want
    });
    const mostrarNotificacion = (msg, type) => {
        toast({ message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
    }
   
    useEffect(() => {
        obtenerCotizacion(dni,
            initializer,mostrarNotificacion,setLoading,setLink
           
          );
    }, [])
    const descargar = () => {
      
        Linking.openURL('http://'+link)
     
      };
      const enviarCoti = () => {
        enviarCotizacion({client_id:client_id,link:link},initializer,mostrarNotificacion,setLoading)

     
      };
      const refrescar = () => {
      
        setLink("")
        obtenerCotizacion(dni,
            initializer,mostrarNotificacion,setLoading,setLink
           
          );
      };
      
    return (
<View style={styles.container}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Documento de cotización</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:10,marginBottom:10,flexDirection:'row',paddingHorizontal:'5%'}}>
        
          
            <TouchableOpacity
            disabled={ link==""||link=="0"}
                   onPress={() => enviarCoti()}
                    style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="send" size={18} color={'#323B62'} /> Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 disabled={ link==""||link=="0"}
                   onPress={() => descargar()}
                    style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="download" size={18} color={'#323B62'} /> Descargar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => refrescar()}
                    style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="refresh-ccw" size={18} color={'#323B62'} /> Refrescar</Text>
                </TouchableOpacity>
            </View>
            
            {
                link!=""?
                link!="0"?
                <WebView  scalesPageToFit={false}  domStorageEnabled={true}
                decelerationRate="normal"  style={{ height:height,width:width,resizeMode: 'cover', flex: 1 }}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                startInLoadingState={true} automaticallyAdjustContentInsets={false} javaScriptEnabled={true} source={{ uri:"https://docs.google.com/viewer?url=http://"+link+"&embedded=true"}} />
              :
              <View style={{ marginTop:20,display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
               
              <SvgXml xml={svg} width={190} height={200}/>
              <Text>El interesado no posee cotizaciones</Text>
          </View>
                :
                <View style={{ marginTop:20,display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
               
                <SvgXml xml={svg} width={190} height={200}/>
                <Text>No hay registros de cotizaciones</Text>
            </View>
            }
         

</View>

    
         


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor:'white',
        paddingTop: Constants.statusBarHeight,
        height: height, width: '100%', resizeMode: "cover",
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