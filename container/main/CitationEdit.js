import React,{useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity ,Switch,Platform} from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {dateFormatA, getHours} from '../../utils/Date'
import Initializer from '../../store/Initializer'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';

import {obtenerPorId,editarCitas,eliminarCitation} from '../../utils/API/citation'
export default function CitationEdit({ route, navigation }) {
    const initializer = React.useContext(Initializer);
    const { toast } = useToast()
    const {  id } = route.params;
    const [loading, setLoading] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fecha, setFecha] = React.useState('');
    const [hora, setHora] = React.useState('');
    const [observation, setObservation] = React.useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [address, setAddress] = React.useState('');
    const [effective, setEffective] = React.useState(false);
    const [data,setData] = useState(null)
   React.useEffect(()=>{
    obtenerPorId(id,setData,initializer)
   },[])
   React.useEffect(()=>{
    if(data!=null){
        setTitle(data.titulo);
        setDescription(data.descripcion);
        setObservation(data.observaciones);
        setAddress(data.id_direccion);
        setDate(new Date(data.fecha))
        setEffective(data.es_efectiva==1?true:false)
    }
   },[data])
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
    const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
        if(type=="success"){
            
            navigation.navigate('Main',{refresh:true})
         }
    }
    const editar = ()=>{
        editarCitas({lead_id:data.lead_id,title,description,address,is_effective:effective?1:0,date,observation,citation_id:id},initializer,mostrarNotificacion,setLoading)
    }
    const eliminar = ()=>{
        eliminarCitation(id,initializer,mostrarNotificacion,setLoading)
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Editar cita</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: '5%', marginTop: 10 }} >
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
                       style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems:'flex-start',padding: 10 }}
                       onPress={showDatepicker}
                    >
                        <Text style={{ color: 'black',  textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar fecha ({dateFormatA(date)})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={showTimepicker} 
                          style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, alignItems:'flex-start',padding: 10 }}
                    >
                        <Text style={{ color: 'black',  textAlign: 'center' }}><Feather name="calendar" size={18} color="black" />   Seleccionar hora ({getHours(date)})</Text>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      minimumDate={new Date()}
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
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Es efectiva?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#323B62" }}
                            thumbColor={effective ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            style={{ marginBottom: 15 }}
                            onValueChange={text => setEffective(!effective)}
                            value={effective}
                        />
                    </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row',marginHorizontal:15,alignItems:'baseline' }}>

                    <TouchableOpacity
                        style={{width:'85%',marginRight:10, borderRadius: 10, marginTop: 15, backgroundColor: '#323B62', padding: 13 }}
                        onPress={editar}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width:'10%',justifyContent:'center',alignItems:'center'}}
                        onPress={eliminar}
                    >
                        <Feather name="trash-2" size={24} color="#E8505C" />
                    </TouchableOpacity>
                </View>


            </View>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight+10,
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
