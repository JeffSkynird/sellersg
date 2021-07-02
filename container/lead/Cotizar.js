import React, { useState, useEffect, useContext } from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import { View, TouchableOpacity, Text ,Dimensions,StyleSheet,Image} from 'react-native'
import { tieneArchivos, tieneArchivosS } from "../../utils/API/clients";
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
export default function Cotizar({ navigation, route }) {
    const initializer = React.useContext(Initializer);
    const { dni } = route.params;
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
        cotizar(  {
            cedula_interesado:dni
          },
            initializer,mostrarNotificacion,setLoading,setLink
           
          );
    }, [])

    return (
<View style={styles.container}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center',marginBottom:10 }}>
                <Text style={{ fontSize: 24 }}>Crear cotización</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
       
            
            {
                link!=""?
                <WebView  scalesPageToFit={false}  domStorageEnabled={true}
                decelerationRate="normal"  style={{ height:height,width:width,resizeMode: 'cover', flex: 1 }}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                startInLoadingState={true} automaticallyAdjustContentInsets={false} javaScriptEnabled={true} source={{ uri:"http://"+link
                }} />
                :
                <View style={{ marginTop:20,display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
               
                <SvgXml xml={svg} width={190} height={200}/>
                <Text>El asesor no existe o no posee permisos para acceder</Text>
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