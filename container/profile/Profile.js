import React,{useEffect,useState,useContext} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image,ImageBackground } from 'react-native'
import Constants from 'expo-constants';
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {obtenerDatosAsesor} from '../../utils/API/asesors'
import {cerrarSesion} from '../../utils/API/auth'
import ProgressLoader from 'rn-progress-loader';

import { useToast } from 'react-native-styled-toast'

import Initializer from '../../store/Initializer'

export default function Profile(props) {
    const initializer = React.useContext(Initializer);
    const [data,setData] = useState(null)
    const [url,setUrl] = useState(null)
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        obtenerDatosAsesor(setData,initializer)
        
    },[])
    useEffect(()=>{
        if(data!=null){
            setUrl('http://api.ambiensa.info/storage/assesor_storage/'+data.cedula+'-profile.png')
        }
    },[data])
    const cerrar=()=>{
        cerrarSesion(initializer,mostrarNotificacion,setLoading)
    }
    const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }

    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()} ><Feather name="menu" size={24} color="white" /></TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>Mi perfil</Text>
                <Image style={{ height: 30, width: 80 }} source={require('../../assets/LogoAmbiensaWhite.png')} />

            </View>
            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
                <View style={{ borderColor: '#323B62', borderWidth: 2, borderRadius: 130, width: 130, height: 130, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        url!=null?
                        <Image style={{ width: 130, height: 130, borderRadius: 130, resizeMode: 'cover' }} 
                        onError={() => {
                           
                            let ext = url.split('/')[url.split('/').length-1].split('.')[1]
                           if(ext=="png"){
                               if(data!=null){
                                setUrl('http://api.ambiensa.info/storage/assesor_storage/'+data.cedula+'-profile.jpeg')
                               }
                           }else if(ext=="jpeg"){
                            if(data!=null){
                                setUrl('http://api.ambiensa.info/storage/assesor_storage/'+data.cedula+'-profile.jpg')
                               }
                           }
                        }} source={{uri:url}} />
    
                        :
                        null
                    }
                   
                </View>
                <Text style={{ color: '#323B62', fontWeight:'bold',fontSize: 24, marginTop:10}}>{data!=null?data.nombres+" "+data.apellidos:""}</Text>

                <View style={{ height:120,justifyContent:'space-between',marginTop: 15, marginHorizontal: '10%',alignSelf:'flex-start' }}>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="mail" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.email:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="v-card" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.cedula:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="phone" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.celular:""}/{data!=null?data.telefono:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="address" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.direccion:""}</Text>
                        </View>
                    </View>
                    <View style={{  alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="calendar" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{data!=null?data.fecha_nacimiento:""}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity
                   onPress={cerrar}
                   style={{width:250,marginBottom:15,borderRadius: 10,  marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
               >
                   <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="log-out" size={18} color="white" />   CERRAR SESIÓN</Text>
               </TouchableOpacity>
                </View>
                
            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        height: windowHeight, width: '100%', resizeMode: "cover",
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
