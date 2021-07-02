import React ,{useState} from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions,ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
const windowHeight = Dimensions.get('window').height;
import { enviarMensaje } from "../../utils/API/leads.js";
import Initializer from '../../store/Initializer'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';

import {

    cotizar,
 
    obtenerCotizacion,
    
  } from "../../utils/API/clients.js";
export default function SendMessage({ navigation, route }) {
    const initializer = React.useContext(Initializer);
    const { lead_id,dni,client_id } = route.params;
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);

    const [msg, setMsg] = React.useState("")
    const enviar = () => {
        enviarMensaje({ message: msg, lead_id }, initializer, mostrarNotificacion)
    }
    const mostrarNotificacion = (msg, type) => {
        toast({ message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
    }
 
 
    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Cotización</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cotizar',{dni:dni})}
                style={{ borderRadius: 10, marginBottom:10,marginHorizontal: '5%', backgroundColor: '#E8505C', padding: 13 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold',  }}><Feather name="dollar-sign" size={18} color="white" />   Realizar cotización</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>  navigation.navigate('Visor',{dni:dni,client_id:client_id})}
                style={{ borderRadius: 10, marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold',  }}><Feather name="file-text" size={18} color="white" />   Obtener pdf</Text>
            </TouchableOpacity>
           {/*  <TextInput
                style={{ marginHorizontal: '5%', height: 70, backgroundColor: 'white', marginBottom: 10, borderRadius: 8, padding: 10 }}
                onChangeText={text => setMsg(text)}
                value={msg}
                multiline={true}
                numberOfLines={4}
                placeholder="Mensaje"
            />
            <TouchableOpacity
                onPress={() => enviar()}
                style={{ borderRadius: 10, marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="send" size={18} color="white" />   ENVIAR</Text>
            </TouchableOpacity> */}
           
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
