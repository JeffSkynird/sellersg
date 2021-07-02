import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateFormatA, getHours } from '../../utils/Date'
import Initializer from '../../store/Initializer'
import { useToast } from 'react-native-styled-toast'
import { Picker } from '@react-native-picker/picker';
import { obtenerLeadsPorAsesor } from "../../utils/API/leads.js";
import ProgressLoader from 'rn-progress-loader';

import { obtenerPorId, registrarCitas, eliminarCitation } from '../../utils/API/citation'
import { ScrollView } from 'react-native-gesture-handler';
export default function CitationEdit({ route, navigation }) {
    const initializer = React.useContext(Initializer);
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);


    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [clientsData, setClientsData] = React.useState([])
    const [client, setClient] = React.useState('')
    const [fecha, setFecha] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [effective, setEffective] = React.useState(false);

    const [hora, setHora] = React.useState('');
    const [observation, setObservation] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerLeadsPorAsesor(setClientsData, initializer);
        }
    }, [initializer.usuario]);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const mostrarNotificacion = (msg, type) => {
        toast({ message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
        if (type == "success") {

            navigation.navigate('Main', { refresh: true })
        }
    }
    const editar = () => {
        registrarCitas({ title, description, date, observation, address, lead_id: client }, initializer, mostrarNotificacion, setLoading)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <ScrollView >
            
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Crear cita</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: '5%', marginTop: 10 }} >
                <View style={{ marginVertical: 10, borderWidth: 0.5, borderColor: 'gray', borderRadius: 5, width: '100%', }}>

                    <Picker
                        selectedValue={client}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setClient(itemValue)
                        }>
                        <Picker.Item label="Seleccione un cliente" value="" />
                        {clientsData.map((e) => (
                            <Picker.Item label={e.nombres + " " + e.apellidos} value={e.id} key={e.id} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder="Título"
                />
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder="Descripción"
                />
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setAddress(text)}
                    value={address}
                    placeholder="Dirección"
                />
                <TouchableOpacity
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems: 'flex-start', padding: 10 }}
                    onPress={showDatepicker}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar fecha ({dateFormatA(date)})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showTimepicker}
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems: 'flex-start', padding: 10 }}
                >
                    <Text style={{ color: 'black', textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar hora ({getHours(date)})</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        minimumDate={new Date()}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <TextInput
                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                    onChangeText={text => setObservation(text)}
                    value={observation}
                    placeholder="Observación"
                />
            </View>
        


                <TouchableOpacity
                    style={{ marginHorizontal: '5%', borderRadius: 10, marginTop: 20, backgroundColor: '#323B62', padding: 13 }}
                    onPress={editar}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   CREAR</Text>
                </TouchableOpacity>



            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
  flex:1,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: 'white',paddingBottom:10
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
