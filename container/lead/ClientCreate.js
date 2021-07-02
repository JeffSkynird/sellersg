import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Switch, StyleSheet, TextInput, Platform, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Initializer from '../../store/Initializer'
import { obtenerTodosProvincias } from "../../utils/API/provinces.js";
import { obtenerTodos } from "../../utils/API/cities.js";
import { obtenerRecomendaciones } from "../../utils/API/recomendations.js";
import { registrarCliente, } from "../../utils/API/clients.js";
import { dateFormatA, convertirDate } from '../../utils/Date'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';
import { MaskedInput } from 'react-native-ui-lib';


export default function ClientEdit({ navigation, route }) {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);

    const initializer = React.useContext(Initializer);
    const [dni, setDni] = useState('')
    const [names, setNames] = useState('')
    const [lastNames, setLastNames] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [landline, setLandLine] = useState('')
    const [address, setAddress] = useState('')
    const [calle2, setCalle2] = useState('')
    const [villa, setVilla] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [province, setProvince] = useState('')
    const [provinceData, setProvinceData] = useState([])
    const [city, setCity] = useState('')
    const [cityData, setCityData] = useState({ data: [], backup: [] })
    const [recomendation, setRecomendation] = useState('')
    const [recomendationData, setRecomendationData] = useState([])
    const [civil, setCivil] = useState('')
    const [monthlyIva, setMonthlyIva] = useState(false)
    const [otherMonthlyIva, setOtherMonthlyIva] = useState(false)


    const [income, setIncome] = useState('')
    const [otherIncome, setOtherIncome] = useState('')
    const [otherExpenses, setOtherExpenses] = useState('')


    const [rent, setRent] = useState('')
    const [food, setFood] = useState('')
    const [clothing, setClothing] = useState('')
    const [basic, setBasic] = useState('')
    const [education, setEducation] = useState("");
    const [transport, setTransport] = useState("");
    const [dependence, setDependence] = useState(true);

    const [dniR, setDniR] = useState("");
    const [namesR, setNamesR] = useState("");
    const [proyectoR, setProyectoR] = useState("");

    //CONYUGE
    const [dependenceS, setDependenceS] = useState(true);
    const [monthlyIvaS, setMonthlyIvaS] = useState(false)
    const [otherMonthlyIvaS, setOtherMonthlyIvaS] = useState(false)

    const [dniS, setDniS] = useState('')
    const [namesS, setNamesS] = useState('')
    const [lastNamesS, setLastNamesS] = useState('')
    const [emailS, setEmailS] = useState('')
    const [cellphoneS, setCellphoneS] = useState('')
    const [landlineS, setLandLineS] = useState('')
    const [incomeS, setIncomeS] = useState('')
    const [otherIncomeS, setOtherIncomeS] = useState('')

    const [date, setDate] = useState(new Date(1598051730000));
    const [dateString, setDateString] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [editDate, setEditDate] = useState(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        obtenerTodosProvincias(setProvinceData)
        obtenerTodos(setCityData)
        obtenerRecomendaciones(setRecomendationData)

    }, [])
    const renderMaskedInput = (value) => {
   
        return (
            <View>
                <Text>
                    {value.substr(0, 4) == '' ? '___' : value.substr(0, 4)} /{' '}
                    {value.substr(4, 2) == '' ? '_' : value.substr(4, 2)} / {value.substr(6, 2) == '' ? '_' : value.substr(6, 2)}
                </Text>
            </View>
        );
    };
    const getId = (nombre) => {
        let datos = [
            {
                id: 1,
                name: "CASADO(A)",
            },
            {
                id: 2,
                name: "SEPARADO(A) JUDICIALMENTE",
            },
            {
                id: 3,
                name: "DIVORCIADO(A)",
            },
            {
                id: 4,
                name: "VIUDO(A)",
            },
            {
                id: 5,
                name: "UNION DE HECHO",
            },
            {
                id: 6,
                name: "SOLTERO(A)",
            },
        ];
        let id_civil = "";
        datos.map((e) => {
            if (nombre == e.name) {
                id_civil = e.id;
            }
        });
        return id_civil;
    };
    const mostrarNotificacion = (msg, type) => {
        toast({ message: msg, bg: type, color: type, iconColor: type, iconName: type == "error" ? 'x-circle' : 'check-circle', })
        if(type=="success"){
            
           navigation.navigate('Lead',{refresh:true})
        }
    }
    const getName = (id) => {
        let datos = [
            {
                id: 1,
                name: "CASADO(A)",
            },
            {
                id: 2,
                name: "SEPARADO(A) JUDICIALMENTE",
            },
            {
                id: 3,
                name: "DIVORCIADO(A)",
            },
            {
                id: 4,
                name: "VIUDO(A)",
            },
            {
                id: 5,
                name: "UNION DE HECHO",
            },
            {
                id: 6,
                name: "SOLTERO(A)",
            },
        ];
        let id_civil = "";
        datos.map((e) => {
            if (id == e.id) {
                id_civil = e.name;
            }
        });
        return id_civil;
    };
    const editar = () => {
        if(validacion()){
        registrarCliente({

            dni: dni,
            monthly_iva: monthlyIva == true ? 1 : 0,
            monthly_ivaS: monthlyIvaS == true ? 1 : 0,

            other_monthly_iva: otherMonthlyIva == true ? 1 : 0,
            other_monthly_ivaS: otherMonthlyIvaS == true ? 1 : 0,

            dependence: dependence == true ? 0 : 1,
            dependence_spouse: dependenceS == true ? 1 : 0,
            names: names,
            last_names: lastNames,
            cellphone: cellphone,
            reference: "N/A",
            born_date: dateFormatA(date),
            city_id: city,
            recomendation_id: recomendation,
            civil: civil,
            civil_name: getName(civil),
            referred_dni: dniR,
            referred_names: namesR,
            referred_proyect: proyectoR,

            landline: landline,
            address: address,
            neighborhood: "N/A",
            block: calle2,
            town: villa,
            citadel: descripcion,
            position: "Paso 3",
            email: email,
            month_income: income,
            other_income: otherIncome,
            other_expenses: otherExpenses,
            rent_expenses: rent,
            food_expenses: food,
            clothing_expenses: clothing,
            basic_expenses: basic,
            education_expenses: education,
            transport_expenses: transport,
            spouse_dni: dniS,
            spouse_names: namesS,
            spouse_last_names: lastNamesS,
            spouse_born_date: "N/A",
            spouse_cellphone: cellphoneS,
            spouse_landline: landlineS,

            spouse_email: emailS,

            month_income_spouse: incomeS,
            other_income_spouse: otherIncomeS,

        }, initializer, mostrarNotificacion, setLoading)
    }
    }
    const validarEmail = (valor) => {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
          return true;
        } else {
          return false;
        }
      }
      
    const validacion = () => {
        let pass = true
        let msg = ''
        if (!validarCedula(dni)) {
            pass = false
            msg += '\n* Cédula inválida'
        }
        if (!validarEmail(email)) {
          pass = false
          msg += '\n* Email inválido'
        }
        if (cellphone.length != 10) {
          pass = false
          msg += '\n* Longitud del celular'
        }
        if (landline.length != 9) {
          pass = false
          msg += '\n* Longitud del convencional'
        }
        if(civil == 1 || civil == 5){
            if (!validarCedula(dniS)) {
                pass = false
                msg += '\n* Cónyuge: Cédula inválida'
            }
            if (!validarEmail(emailS)) {
                pass = false
                msg += '\n* Cónyuge: Email inválido'
              }
              if (cellphoneS.length != 10) {
                pass = false
                msg += '\n* Cónyuge: Longitud del celular'
              }
              if (landlineS.length != 9) {
                pass = false
                msg += '\n* Cónyuge: Longitud del convencional'
              }
        }
        if (pass == false) {
           mostrarNotificacion(msg,"error");
    
        }
        return pass
      }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateString(dateString)
    };
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
    const filtrar = (id) => {

        let newArray = []
        cityData.backup.map((e) => {
            if (id == e.province_id) {
                newArray.push({ ...e })
            }
        })

        setProvince(id)
        setCityData({ backup: cityData.backup, data: newArray })

    };
    function validarCedula(cad) {
        if (cad != null) {

            var total = 0;
            var longitud = cad.length;
            var longcheck = longitud - 1;

            if (cad !== "" && longitud === 10) {
                for (let i = 0; i < longcheck; i++) {
                    if (i % 2 === 0) {
                        var aux = cad.charAt(i) * 2;
                        if (aux > 9) aux -= 9;
                        total += aux;
                    } else {
                        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                    }
                }

                total = total % 10 ? 10 - (total % 10) : 0;

                if (cad.charAt(longitud - 1) == total) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
     
    return (
        <View style={styles.container}>

            <ScrollView style={{ flex: 1, height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>Crear cliente</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: '5%' }}>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => {
                            const re = /^[0-9\b]+$/;

                            if (text === "" || re.test(text)) {
                            setDni(text)
                            }
                        }
                        }
                        keyboardType="numeric"
                        value={dni}
                        placeholder="Cédula"
                    />
                    {dni != "" ? !validarCedula(dni) ?
                        <Text style={{ fontWeight: 'bold', color: '#E8505C' }} >Cédula inválida</Text>
                        : null : null}


                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => {
                            if (new RegExp("^[a-zA-Z ]+$").test(text)) {
                                setNames(text)
                            }
                        }}
                        value={names}
                        placeholder="Nombres"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => {
                            if (new RegExp("^[a-zA-Z ]+$").test(text)) {
                                setLastNames(text)
                            }
                        }}
                        value={lastNames}
                        placeholder="Apellidos"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Correo electrónico"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCellphone(text)}
                        value={cellphone}
                        keyboardType="numeric"
                        placeholder="Celular"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setLandLine(text)}
                        value={landline}
                        keyboardType="numeric"
                        placeholder="Teléfono"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setAddress(text)}
                        value={address}
                        placeholder="Calle 1"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setCalle2(text)}
                        value={calle2}
                        placeholder="Calle 2"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setVilla(text)}
                        value={villa}
                        placeholder="Villa"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setDescripcion(text)}
                        value={descripcion}
                        placeholder="Otra descripción de dirección"
                    />
                    <Text style={{ fontSize: 15, padding: 10 }} >Fecha de nacimiento</Text>

                    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}>

                        {
                            editDate ?
                                <MaskedInput
                                    value={dateString}
                                    onChangeText={(e) => {
                                        if (e.length == 8) {
                                            var st = e.substr(0, 4) + "/" + e.substr(4, 2) + "/" + e.substr(6, 2)
                                            var pattern = /(\d{4})\.(\d{2})\.(\d{2})/;
                                            var dt = new Date(st.replace(pattern, '$3-$2-$1'));
                                            if (dt instanceof Date && !isNaN(dt)) {

                                                setDate(dt)
                                                setDateString(e)
                                            } else {
                                                setDateString(e);

                                            }
                                        } else {
                                            setDateString(e);
                                        }

                                    }}
                                    renderMaskedText={renderMaskedInput}
                                    caretHidden
                                    keyboardType={'numeric'}
                                />

                                :
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                >
                                    <Text><Feather name="calendar" size={18} color="black" />   Seleccionar fecha ({dateFormatA(date)})</Text>

                                </TouchableOpacity>

                        }
                        <TouchableOpacity
                            onPress={() => setEditDate(!editDate)}
                        >
                            <Feather name={editDate ? "calendar" : "edit"} size={18} color="black" />
                        </TouchableOpacity>
                    </View>


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
                    <Picker
                        key="1"
                        id="1"
                        selectedValue={province}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            filtrar(itemValue)
                        } >
                        <Picker.Item label="Seleccione una provincia" value="" />
                        {provinceData.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Picker
                        key="2" id="2"
                        selectedValue={city}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCity(itemValue)
                        } >
                        <Picker.Item label="Seleccione una ciudad" value="" />
                        {cityData.data.map((e) => (
                            <Picker.Item label={e.names} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={recomendation}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setRecomendation(itemValue)
                        }>
                        <Picker.Item label="¿Cómo se entero de nosotros?" value="" />
                        {recomendationData.map((e) => (
                            <Picker.Item label={e.name} key={e.id} value={e.id} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={civil}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCivil(itemValue)
                        } >
                        <Picker.Item label="Estado civil" value="" />
                        <Picker.Item label="Casado(a)" value={1} />
                        <Picker.Item label="Separado(a) judicialmente" value={2} />
                        <Picker.Item label="Divorciado(a)" value={3} />
                        <Picker.Item label="Viudo(a)" value={4} />
                        <Picker.Item label="Unión de hecho(a)" value={5} />
                        <Picker.Item label="Soltero(a)" value={6} />

                    </Picker>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, }}></View>
                    {
                        recomendation == 5 ?
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Datos del referidor</Text>
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setDniR(text)}
                                    value={dniR}
                                    keyboardType="numeric"
                                    placeholder="Cédula"
                                />

                                {!validarCedula(dniR) ?
                                    <Text style={{ fontWeight: 'bold', color: '#E8505C' }} >Cédula inválida</Text>
                                    : null}
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setNamesR(text)}
                                    value={namesR}
                                    placeholder="Nombres completos"
                                />
                                <Picker
                                    selectedValue={proyectoR}
                                    style={{ height: 50, width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setProyectoR(itemValue)
                                    } >
                                    <Picker.Item label="Proyecto donde compró" value="" />
                                    <Picker.Item label="ALTAMAR II" value="ALTAMAR II" />
                                    <Picker.Item label="CIUDAD OLIMPO" value="CIUDAD OLIMPO" />
                                    <Picker.Item label="PLAZA OLIMPO" value="PLAZA OLIMPO" />
                                    <Picker.Item label="BELLA VITA" value="BELLA VITA" />
                                    <Picker.Item label="BOSQUETTO" value="BOSQUETTO" />
                                    <Picker.Item label="BELLA VITA 2" value="BELLA VITA 2" />
                                    <Picker.Item label="PASEO DEL SOL" value="PASEO DEL SOL" />
                                    <Picker.Item label="VILLA GERANIO" value="VILLA GERANIO" />
                                </Picker>
                            </View>


                            : null
                    }

                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Ingresos</Text>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setIncome(text)}
                        value={income}
                        keyboardType="numeric"
                        placeholder="Sueldo"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setOtherIncome(text)}
                        value={otherIncome}
                        keyboardType="numeric"
                        placeholder="Otros ingresos"
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Egresos</Text>
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setRent(text)}
                        value={rent}
                        keyboardType="numeric"
                        placeholder="Renta"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setFood(text)}
                        value={food}
                        keyboardType="numeric"
                        placeholder="Comida"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setClothing(text)}
                        value={clothing}
                        keyboardType="numeric"
                        placeholder="Ropa"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setBasic(text)}
                        value={basic}
                        keyboardType="numeric"
                        placeholder="Servicios básicos"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setEducation(text)}
                        value={education}
                        keyboardType="numeric"
                        placeholder="Educación"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setTransport(text)}
                        value={transport}
                        keyboardType="numeric"
                        placeholder="Transporte"
                    />
                    <TextInput
                        style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                        onChangeText={text => setOtherExpenses(text)}
                        value={otherExpenses}
                        keyboardType="numeric"
                        placeholder="Otros egresos"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Tiene relación de dependencia?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#323B62" }}
                            thumbColor={dependence ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            style={{ marginBottom: 15 }}
                            onValueChange={text => setDependence(!dependence)}
                            value={dependence}
                        />
                    </View>
                    {dependence == false ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Declaraciones del IVA mensuales?</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#323B62" }}
                                thumbColor={monthlyIva ? "white" : "white"}
                                ios_backgroundColor="#3e3e3e"
                                style={{ marginBottom: 15 }}
                                onValueChange={text => setMonthlyIva(!monthlyIva)}
                                value={monthlyIva}
                            />
                        </View>
                        : null}
                    {otherIncome > 0 ?
                        <View >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}> Otros ingresos: </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Declaraciones del IVA mensuales?</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#323B62" }}
                                    thumbColor={otherMonthlyIva ? "white" : "white"}
                                    ios_backgroundColor="#3e3e3e"
                                    style={{ marginBottom: 15 }}
                                    onValueChange={text => setOtherMonthlyIva(!otherMonthlyIva)}
                                    value={otherMonthlyIva}
                                />
                            </View>
                        </View>


                        : null}
                    {
                        civil == 1 || civil == 5 ?

                            <View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, }}></View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Datos del Cónyuge</Text>
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setDniS(text)}
                                    value={dniS}
                                    keyboardType="numeric"
                                    placeholder="Cédula"

                                />
                                {!validarCedula(dniS) ?
                                    <Text style={{ fontWeight: 'bold', color: '#E8505C' }} >Cédula inválida</Text>
                                    : null}
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setNamesS(text)}
                                    value={namesS}
                                    placeholder="Nombres"
                                />
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setLastNamesS(text)}
                                    value={lastNamesS}
                                    placeholder="Apellidos"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Información de contacto</Text>
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setEmailS(text)}
                                    value={emailS}
                                    placeholder="Correo"
                                />
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setCellphoneS(text)}
                                    value={cellphoneS}
                                    keyboardType="numeric"
                                    placeholder="Celular"
                                />
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setLandLineS(text)}
                                    value={landlineS}
                                    keyboardType="numeric"
                                    placeholder="Teléfono convencional"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Ingresos</Text>
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setIncomeS(text)}
                                    value={incomeS}
                                    keyboardType="numeric"
                                    placeholder="Sueldo"
                                />
                                <TextInput
                                    style={{ height: 45, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, padding: 10 }}
                                    onChangeText={text => setOtherIncomeS(text)}
                                    value={otherIncomeS}
                                    keyboardType="numeric"
                                    placeholder="Otros ingresos"
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Tiene relación de dependencia?</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#323B62" }}
                                        thumbColor={dependenceS ? "white" : "white"}
                                        ios_backgroundColor="#3e3e3e"
                                        style={{ marginBottom: 15 }}
                                        onValueChange={text => setDependenceS(!dependenceS)}
                                        value={dependenceS}
                                    />
                                </View>
                                {dependenceS == false ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Declaraciones del IVA mensuales?</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#323B62" }}
                                            thumbColor={monthlyIvaS ? "white" : "white"}
                                            ios_backgroundColor="#3e3e3e"
                                            style={{ marginBottom: 15 }}
                                            onValueChange={text => setMonthlyIvaS(!monthlyIvaS)}
                                            value={monthlyIvaS}
                                        />
                                    </View>
                                    : null}
                                {otherIncomeS > 0 ?
                                    <View >
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}> Otros ingresos: </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>¿Declaraciones del IVA mensuales?</Text>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#323B62" }}
                                                thumbColor={otherMonthlyIvaS ? "white" : "white"}
                                                ios_backgroundColor="#3e3e3e"
                                                style={{ marginBottom: 15 }}
                                                onValueChange={text => setOtherMonthlyIvaS(!otherMonthlyIvaS)}
                                                value={otherMonthlyIvaS}
                                            />
                                        </View>
                                    </View>


                                    : null}
                            </View>

                            : null
                    }

                    <TouchableOpacity
                        style={{ borderRadius: 10, marginBottom: 10, backgroundColor: '#323B62', padding: 13 }}
                        onPress={editar}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   CREAR</Text>
                    </TouchableOpacity>
                    <ProgressLoader
                        visible={loading}
                        isModal={true} isHUD={true}
                        hudColor={"#000000"}
                        color={"#FFFFFF"} />
                </View>

            </ScrollView>
        </View >

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
