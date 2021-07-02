import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { obtenerLeadsPorAsesor, obtenerInfoCliente } from "../../utils/API/leads.js";
import Initializer from '../../store/Initializer'
import { obtenerOpciones } from '../../utils/API/precalificator'

export default function Client({ navigation, route }) {
    const { lead_id } = route.params;
    const initializer = React.useContext(Initializer);
    const [clientData, setClientData] = React.useState(null);
    React.useEffect(() => {
        obtenerInfoCliente(lead_id, setClientData, initializer)
    }, [])
    const [opciones, setOpciones] = useState([])
    const [colorA, setColorA] = React.useState("transparent");
    const [colorP, setColorP] = React.useState("transparent");
    const [colorR, setColorR] = React.useState("transparent");
    const [colorN, setColorN] = React.useState("transparent");
    useEffect(() => {

        if (initializer.usuario != null) {

            obtenerOpciones(setOpciones, initializer);

        }




    }, [initializer.usuario])
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
console.log(clientData)
    return (


        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} ><Feather name="arrow-left" size={24} color="white" /></TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>Cliente</Text>
                <Image style={{ height: 30, width: 80 }} source={require('../../assets/LogoAmbiensaWhite.png')} />

            </View>
            <ScrollView style={{ flex: 1, height: '100%' }}>

                <View style={{ flex: 1, marginTop: 15, width: '100%', alignItems: 'center' }}>
                    <View style={{ borderColor: '#323B62', borderWidth: 2, borderRadius: 130, width: 130, height: 130, justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name="user" size={70} color="#323B62" />
                    </View>
                    <View style={{ marginTop:10,flexDirection: 'row',justifyContent:'space-between',width:'100%',paddingHorizontal:10}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ClientEdit', { id: clientData != null ? clientData.id : 0 })}
                            style={{ borderRadius: 10,height:40,paddingHorizontal:10,backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="edit" size={18} color="#323B62" /> Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Upload', { id: clientData != null ? clientData.id : 0, dniD: clientData != null ? clientData.dni : "" })}
                            style={{ borderRadius: 10,height:40,paddingHorizontal:10,backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}

                        >
                            <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="upload" size={18} color="#323B62" />   Documentación</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Precalificator', {dependenceS:clientData != null ? clientData.dependence_spouse:1, dependence:clientData != null ? clientData.dependencia:1,dni:clientData != null ? clientData.cedula : "N/A",id: clientData != null ? clientData.id : 0, status: clientData != null ? clientData.color : "" })}
                            style={{ borderRadius: 10,height:40,paddingHorizontal:10,backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}

                        >
                            <Text style={{ color: '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Octicons name="dashboard" size={18} color="#323B62" />   Precalificador</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={{marginLeft:'5%', alignSelf:'flex-start',color: '#323B62', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 15 }}>{clientData != null ? clientData.nombres : ""} {clientData != null ? clientData.apellidos : ""}</Text>

                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="info" size={20} color="black" />
                            <Text style={{ color: 'black', fontWeight:'bold',fontSize: 20, marginLeft: 10, marginRight: 10, color: obtenerColor(clientData != null ? clientData.color : "") }}>{clientData != null ? clientData.color : ""}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="mail" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{clientData != null ? clientData.email : ""}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="v-card" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{clientData != null ? clientData.cedula : ""}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="phone" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{clientData != null ? clientData.celular : ""} / {clientData != null ? clientData.telefono : ""}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="address" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginRight: 10 }}>{clientData != null ? clientData.direccion : ""}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="users" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{clientData != null ? clientData.id_estado_civil : ""}</Text>
                        </View>
                    </View>
                    <Text style={{ color: '#323B62', fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>Ingresos</Text>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{clientData != null ? clientData.sueldo : ""} / {clientData != null ? clientData.otros_ingresos!=null?clientData.otros_ingresos:0 : ""}</Text>
                        </View>
                    </View>
                    <Text style={{ color: '#323B62', fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>Egresos</Text>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Arriendo: {clientData != null ? clientData.egreso_renta : "0"}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Alimento: {clientData != null ? clientData.egreso_comida : 0}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Vestimenta: {clientData != null ? clientData.egreso_ropa : 0}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Servicios básicos: {clientData != null ? Number(clientData.egreso_servicios_basicos) : 0}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Educación: {clientData != null ? Number(clientData.egreso_educacion) : 0}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Transporte: {clientData != null ? Number(clientData.egreso_transporte) : 0}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%',marginBottom:5, alignSelf: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={20} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>Otros egresos: {clientData != null ? Number(clientData.otros_egresos) : null}</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>
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
