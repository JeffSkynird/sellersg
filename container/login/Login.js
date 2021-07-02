import React from 'react'
import {Dimensions ,View, Image, ScrollView,TouchableOpacity, ImageBackground, Text, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {iniciarSesion,cerrarSesion} from '../../utils/API/auth'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';
import Initializer from '../../store/Initializer'

import { obtenerSession, } from '../../utils/session'

export default function Login(props) {
    const { toast } = useToast()
    const initializer = React.useContext(Initializer);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const iniciar =()=>{
        iniciarSesion(email,password,initializer,mostrarNotificacion,setLoading)
    
    }
 
    const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }
 
   
    return (
        <ScrollView style={{flex:1,width:'100%',height:windowHeight}}>
        <ImageBackground source={require('../../assets/fondo.png')} style={{ flex: 1,height:windowHeight, width: '100%', resizeMode: "cover", }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ marginTop:20,height: 90, width: 180 }}
                    source={require('../../assets/LogoAmbiensa3.png')}
                />


            </View>
            <View style={{ flex: 2 }}>
                <View style={{
                    flex: 1, padding: 20,  borderRadius: 16, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    justifyContent: 'flex-start',
                    elevation: 5, backgroundColor: '#F3F3F3', marginVertical: '5%', marginHorizontal: '13%'
                }}>
                    <Text style={{ marginBottom:20,marginTop:15,color: '#323B62', textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>Iniciar Sesión</Text>
                    <TextInput
                        style={{ height: 45,backgroundColor:'white',marginBottom:10,borderRadius:8,padding:10}}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Correo electrónico"
                    />
                    <TextInput
                        style={{  height: 45,backgroundColor:'white',borderRadius:8,padding:10 }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                    onPress={()=>iniciar()}
                    style={{borderRadius:10,marginTop:15,backgroundColor:'#323B62',padding:13}}
                    >
                        <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}><AntDesign name="login" size={16} color="white" />   CONTINUAR</Text>
                    </TouchableOpacity>
                  
                </View>
            </View>
            <View style={{ flex: 1, }}>
            <Text style={{fontSize:16,fontStyle:'italic',color:'#323B62',fontWeight:'bold',textAlign:'center'}}>  Plan mi casa mi futuro © 2020</Text>

            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
        </ImageBackground>
        </ScrollView>
    )
}
