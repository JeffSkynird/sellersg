import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { obtenerLeadsPorAsesor } from "../../utils/API/leads.js";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { desencriptarJson } from '../../utils/security'
import { obtenerKpisR, obtenerValorCotizaciones,obtenerReservasAsesor } from '../../utils/API/asesors'
import { obtenerTodosPorLead, obtenerTodosPorAsesor } from "../../utils/API/citation";
import Initializer from '../../store/Initializer'
import { dateFormatA } from '../../utils/Date'
import ProgressLoader from 'rn-progress-loader';
import DateTimePicker from '@react-native-community/datetimepicker';
const  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const windowHeight = Dimensions.get('window').height;
export default function Main(props) {
    const initializer = React.useContext(Initializer);
    const [clientsData, setClientsData] = React.useState([])
    const [client, setClient] = React.useState('')
    const [data1, setData1] = React.useState([])
    const [data, setData] = React.useState({})
    const [kpis, setKpis] = React.useState({ citations1: 0, citations2: 0, calls1: 0, calls2: 0 })
    const [cotizaciones, setCotizaciones] = React.useState(0)
    const [isPanelActive, setIsPanelActive] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    const [loading, setLoading] = React.useState(false);
    const [reservas,setReservas] = React.useState(0)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [panelProps, setPanelProps] = React.useState({
        fullWidth: true,
        openLarge: false, onlyLarge: false, onlySmall: true,
        showCloseButton: true,
        onClose: () => setIsPanelActive(false),
        onPressCloseButton: () => setIsPanelActive(false),
    });
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerLeadsPorAsesor(setClientsData, initializer);
            obtenerValorCotizaciones({asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,month:months[date.getMonth()],year:date.getFullYear()},setCotizaciones)
            obtenerReservasAsesor({asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,month:months[date.getMonth()],year:date.getFullYear()},setReservas,initializer)
            obtenerKpisR(setKpis, initializer)
        }
    }, [initializer.usuario]);
    React.useEffect(() => {
        //obtenerValorCotizaciones(setCotizaciones, JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, 'mensual',()=>null)
    }, [])
    React.useEffect(() => {
        if (client != "") {

            obtenerTodosPorLead(client, setData1, initializer)
        }
    }, [client])
    React.useEffect(() => {
        if (data1.length != 0) {

            let newDaysObject = {};
            data1.forEach((day) => {

                let dat = new Date(day.fecha)

                newDaysObject[dateFormatA(dat)] = {
                    dotColor: '#E8505C',
                    marked: true
                };
            });
            setData(newDaysObject)
        }
    }, [data1])
    React.useEffect(() => {
        if (initializer.usuario != null) {
            if (client == "") {

                obtenerTodosPorAsesor(setData1, initializer)
            }
        }
    }, [initializer.usuario, client]);
    const refresh = () => {
        setClient(null)
        setClient("")
        setData1([])
        setData({})
        setClientsData([])
        setKpis({ citations1: 0, citations2: 0, calls1: 0, calls2: 0 })
        setCotizaciones(0)
        obtenerTodosPorAsesor(setData1, initializer)
        obtenerLeadsPorAsesor(setClientsData, initializer);
        obtenerKpisR(setKpis, initializer)
    
        obtenerValorCotizaciones({asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,month:months[date.getMonth()],year:date.getFullYear()},setCotizaciones)

    }
    React.useEffect(() => {
        if(props.route.params!=undefined&&props.route.params!=null){
     
            if(props.route.params.hasOwnProperty("refresh")){
                refresh()
            }
        }
    }, [props.route.params])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const buscar = () => {
      
        obtenerValorCotizaciones({asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,month:months[date.getMonth()],year:date.getFullYear()},setCotizaciones)
        obtenerReservasAsesor({asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,month:months[date.getMonth()],year:date.getFullYear()},setReservas,initializer)
      };
    return (


        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            <ScrollView style={{ flex: 1, height: '100%' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()} ><Feather name="menu" size={24} color="white" /></TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18 }}>Mis citas</Text>
                    <Image style={{ height: 30, width: 80 }} source={require('../../assets/LogoAmbiensaWhite.png')} />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Picker
                        selectedValue={client}
                        style={{ height: 50, width: '90%' }}
                        onValueChange={(itemValue, itemIndex) => {
                            setData1([])
                            setData({})
                            setClient(itemValue)
                        }
                        }>
                        <Picker.Item label="Seleccione un cliente" value="" />
                        {clientsData.map((e) => (
                            <Picker.Item label={e.nombres + " " + e.apellidos} value={e.id} key={e.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity onPress={refresh} ><Feather name="refresh-ccw" size={20} color="black" /></TouchableOpacity>

                </View>
                <View >
                    <Calendar
                        enableSwipeMonths={true}
                        markedDates={data}
                        onDayPress={(day) => props.navigation.navigate('Citations', { date: day, lead_id: client })}
                    />
                </View>
                <View style={{ width: '100%' }} >
                    <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#E8505C', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="calendar" size={18} color={'#E8505C'} />
                            <Text style={{ fontSize: 20 }} >Citas agendadas</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', borderRadius: 5, padding: 5, height: 18, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{kpis.citations1}</Text>
                        </View>


                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#17A2B7', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="check-circle" size={18} color={'#17A2B7'} />
                            <Text style={{ fontSize: 20 }}>Citas efectivas</Text>
                        </View>
                        <View style={{ backgroundColor: '#17A2B7', borderRadius: 5, padding: 5, height: 18, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{kpis.citations2}</Text>
                        </View>


                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#E8505C', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="phone-call" size={18} color={'#E8505C'} />
                            <Text style={{ fontSize: 20 }}>Llamadas salientes</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', borderRadius: 5, padding: 5, height: 18,  justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{kpis.calls1}</Text>
                        </View>


                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#17A2B7', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="check-circle" size={18} color={'#17A2B7'} />
                            <Text style={{ fontSize: 20 }}>Llamadas efectivas</Text>
                        </View>
                        <View style={{ backgroundColor: '#17A2B7', borderRadius: 5, padding: 5, height: 18, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{kpis.calls2}</Text>
                        </View>


                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#17A2B7', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="dollar-sign" size={18} color={'#E8505C'} />
                            <Text style={{ fontSize: 20 }}>Cotizaciones realizadas</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', marginLeft: 5, borderRadius: 5, padding: 5, height: 18, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{cotizaciones}</Text>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ backgroundColor: '#17A2B7', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} /> */}
                            <Feather style={{ marginRight: 10 }} name="calendar" size={18} color={'#E8505C'} />
                            <Text style={{ fontSize: 20 }}>Reservas gestionadas</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', marginLeft: 5, borderRadius: 5, padding: 5, height: 18, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{reservas}</Text>
                        </View>


                    </View>

                </View>
                <View style={{ flex: 1, marginTop: 10,flexDirection:'row' ,marginTop: 30}}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('CitationNew')}
                        style={{ borderRadius: 10,  width:'90%',marginBottom: 10, marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="plus" size={18} color="white" />   NUEVA</Text>
                    </TouchableOpacity>
{/*                     <TouchableOpacity style={{marginTop:10}} onPress={() => setIsPanelActive(true)}  ><Feather name="filter" size={20} color="black" /></TouchableOpacity>
 */}
                </View>


            </ScrollView>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <View style={{ margin: 15 }}>
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#323B62',textAlign:'center'}}>Filtrar metas</Text>
                    <View style={{ marginVertical:10,borderWidth: 0.7, borderColor: '#DEE3ED', width: '100%',  }}>

                    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
         
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
                    </View>
                    <Text style={{ color: 'black', fontSize: 18,marginBottom:10 }}>Seleccione un mes</Text>

                    <TouchableOpacity
                      onPress={showDatepicker}  
                    
                    >
                    <Text style={{ color: 'black', fontSize: 16 }}>{date.getDate()} / {date.getMonth()+1} / {date.getFullYear()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                          buscar()
                        
                        setIsPanelActive(false)}}  
                    
                        style={{ borderRadius: 10, marginTop: 30, marginBottom: 10,  backgroundColor: '#323B62', padding: 13 }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="refresh-cw" size={18} color="white" />   BUSCAR</Text>
                    </TouchableOpacity>

                </View>
                <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </SwipeablePanel>
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
