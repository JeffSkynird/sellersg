import React,{useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import * as DocumentPicker from 'expo-document-picker';
import {  upload,
    uploadConyuge, obtenerDataCliente} from "../../utils/API/clients.js";

    import { useToast } from 'react-native-styled-toast'

export default function Upload({ navigation, route }) {
    const { toast } = useToast()

    const initializer = React.useContext(Initializer);
    const {  id,dniD } = route.params;
    const [dependence, setDependence] = React.useState(true)
    const [ivaMensual, setIvaMensual] = React.useState(true)
    const [civil, setCivil] = React.useState(1)
    const [dependenceS, setDependenceS] = React.useState(false)
    const [dni,setDni] = React.useState(null)
    const [buro,setBuro] = React.useState(null)
    const [precalification,setPrecalification] = React.useState(null)
    const [rol1,setRol1] = React.useState(null)
    const [rol2,setRol2] = React.useState(null)
    const [rol3,setRol3] = React.useState(null)
    const [mecanizado,setMecanizado] = React.useState(null)

    const [ruc,setRuc] = React.useState(null)

    const [iva,setIva] = React.useState(null)
    const [iva2,setIva2] = React.useState(null)
    const [iva3,setIva3] = React.useState(null)
    const [iva4,setIva4] = React.useState(null)
    const [iva5,setIva5] = React.useState(null)
    const [iva6,setIva6] = React.useState(null)
    const [rent,setRent] = React.useState(null)
    const [mov,setMov] = React.useState(null)
    const [mov2,setMov2] = React.useState(null)
    const [mov3,setMov3] = React.useState(null)

    const [dniS,setDniS] = React.useState(null)
    const [buroS,setBuroS] = React.useState(null)
    const [rucS,setRucS] = React.useState(null)
    const [mecanizadoS,setMecanizadoS] = React.useState(null)

    const [precalificationS,setPrecalificationS] = React.useState(null)
    const [rol1S,setRol1S] = React.useState(null)
    const [rol2S,setRol2S] = React.useState(null)
    const [rol3S,setRol3S] = React.useState(null)
    const [ivaS,setIvaS] = React.useState(null)
    const [iva2S,setIva2S] = React.useState(null)
    const [iva3S,setIva3S] = React.useState(null)
    const [iva4S,setIva4S] = React.useState(null)
    const [iva5S,setIva5S] = React.useState(null)
    const [iva6S,setIva6S] = React.useState(null)
    const [rentS,setRentS] = React.useState(null)
    const [movS,setMovS] = React.useState(null)
    const [mov2S,setMov2S] = React.useState(null)
    const [mov3S,setMov3S] = React.useState(null)
    const [data,setData] = React.useState({client:null,spouse:null})



    const [rucFilesO, setRucFilesO] = useState(null);
    const [ivaDeclarationFileO, setIvaDeclarationFileO] = useState(null);
    const [ivaDeclarationFile2O, setIvaDeclarationFile2O] = useState(null);
    const [ivaDeclarationFile3O, setIvaDeclarationFile3O] = useState(null);
    const [ivaDeclarationFile4O, setIvaDeclarationFile4O] = useState(null);
    const [ivaDeclarationFile5O, setIvaDeclarationFile5O] = useState(null);
    const [ivaDeclarationFile6O, setIvaDeclarationFile6O] = useState(null);
  
    const [rentaDeclarationFileO, setRentaDeclarationFileO] = useState(null);
    const [accounMovFileO, setAccountMovFileO] = useState(null);
    const [accounMovFile2O, setAccountMovFile2O] = useState(null);
    const [accounMovFile3O, setAccountMovFile3O] = useState(null);

    //SPOUSE
    const [rucFilesOS, setRucFilesOS] = useState(null);
    const [ivaDeclarationFileOS, setIvaDeclarationFileOS] = useState(null);
    const [ivaDeclarationFile2OS, setIvaDeclarationFile2OS] = useState(null);
    const [ivaDeclarationFile3OS, setIvaDeclarationFile3OS] = useState(null);
    const [ivaDeclarationFile4OS, setIvaDeclarationFile4OS] = useState(null);
    const [ivaDeclarationFile5OS, setIvaDeclarationFile5OS] = useState(null);
    const [ivaDeclarationFile6OS, setIvaDeclarationFile6OS] = useState(null);
    const [rentaDeclarationFileOS, setRentaDeclarationFileOS] = useState(null);
    const [accounMovFileOS, setAccountMovFileOS] = useState(null);
    const [accounMovFile2OS, setAccountMovFile2OS] = useState(null);
    const [accounMovFile3OS, setAccountMovFile3OS] = useState(null);

    React.useEffect(() => {
       
        obtenerDataCliente(dniD,id,setData)
    }, [])
    const subirArchivos = () => {
        upload(
          {
            monthly_iva:data.client.monthly_iva,
            monthly_ivaO:data.client.other_monthly_iva,
            dependencia: data.client.dependence==1?0:1,
            dni:  data.client.dni,
            dni_file: dni,
            roles_file: rol1,
            roles_file2: rol2,
            roles_file3: rol3,
            preca_file: buro,
            mecanizado: mecanizado,
    
            precalification_file: precalification,
            ruc_filesi: ruc,
            decla_filesi: iva,
    
            decla_filesi2: iva2,
            decla_filesi3: iva3,
            decla_filesi4: iva4,
            decla_filesi5: iva5,
            decla_filesi6: iva6,
            
    
            renta_filesi: rent,
            mov_filesi: mov,
    
            ruc_filesiO: rucFilesO != null ? rucFilesO : null,
            decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
            decla_filesi2O: ivaDeclarationFile2O != null ? ivaDeclarationFile2O : null,
            decla_filesi3O: ivaDeclarationFile3O != null ? ivaDeclarationFile3O : null,
            decla_filesi4O: ivaDeclarationFile4O != null ? ivaDeclarationFile4O : null,
            decla_filesi5O: ivaDeclarationFile5O != null ? ivaDeclarationFile5O : null,
            decla_filesi6O: ivaDeclarationFile6O != null ? ivaDeclarationFile6O : null,
            renta_filesiO:
              rentaDeclarationFileO != null ? rentaDeclarationFileO : null,
              mov_filesiO1: accounMovFileO != null ? accounMovFileO : null,
              mov_filesiO2: accounMovFile2O != null ? accounMovFile2O : null,
              mov_filesiO3: accounMovFile3O != null ? accounMovFile3O : null,
           /*  ruc_filesiO: rucFilesO != null ? rucFilesO : null,
            decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
            renta_filesiO:
              rentaDeclarationFileO != null ? rentaDeclarationFileO : null,
            mov_filesiO: accounMovFileO != null ? accounMovFileO : null, */
          },
          initializer,mostrarNotificacion
        );
      };
    
      const subirConyuge = () => {
        if (data.client.civil == 'CASADO(A)' || data.client.civil == 'UNION DE HECHO') {
          uploadConyuge(
            {
              dependencia: data.spouse.dependence==1?0:1,
              monthly_iva:data.spouse.monthly_iva,
              monthly_ivaOS:data.spouse.other_monthly_iva,
              dni: data.spouse.dni,
              dni_file: dniS,
              roles_file: rol1S,
              roles_file2: rol2S,
              roles_file3: rol3S,
              preca_file: precalificationS,
              mecanizado: mecanizadoS,
              ruc_filesi: rucS,
              decla_filesi: ivaS,
    
              decla_filesi2: iva2S,
              decla_filesi3: iva3S,
              decla_filesi4: iva4S,
              decla_filesi5: iva5S,
              decla_filesi6: iva6S,
              
              renta_filesi: rentS,
              mov_filesi: movS,
    
              ruc_filesiO: rucFilesOS != null ? rucFilesOS : null,
              decla_filesiO: ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
              decla_filesi2O: ivaDeclarationFile2OS != null ? ivaDeclarationFile2OS : null,
              decla_filesi3O: ivaDeclarationFile3OS != null ? ivaDeclarationFile3OS : null,
              decla_filesi4O: ivaDeclarationFile4OS != null ? ivaDeclarationFile4OS : null,
              decla_filesi5O: ivaDeclarationFile5OS != null ? ivaDeclarationFile5OS : null,
              decla_filesi6O: ivaDeclarationFile6OS != null ? ivaDeclarationFile6OS : null,
              renta_filesiO:
                rentaDeclarationFileOS != null ? rentaDeclarationFileOS : null,
      
              mov_filesiO1: accounMovFileOS != null ? accounMovFileOS : null,
              mov_filesiO2: accounMovFile2OS != null ? accounMovFile2OS : null,
              mov_filesiO3: accounMovFile3OS != null ? accounMovFile3OS : null,
            /*   ruc_filesiOS: rucFilesOS != null ? rucFilesOS : null,
              decla_filesiOS:
                ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
              renta_filesiOS:
                rentaDeclarationFileOS != null ? rentaDeclarationFileOS : null,
              mov_filesiOS: accounMovFileOS != null ? accounMovFileOS : null, */
            },
            initializer,mostrarNotificacion
          );
          
        }
      };
      const mostrarNotificacion=(msg,type)=>{
        toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
    }
      const subir = () => {
        subirArchivos()
        subirConyuge()
        mostrarNotificacion("La documentación está siendo subida y analizada, en unos minutos se podrá revisar el resultado. ",'success')
      }
    return (
        <View style={styles.container}>

            <ScrollView style={{ flex: 1, height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>Subir documentación</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                    </TouchableOpacity>
                </View>
            {
                data.client!=null?
                data.client.dependence == 1 ?
                    <View style={{ marginHorizontal: '5%', marginTop: 10 }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Por favor, adjuntar los documentos requeridos.</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Cédula</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setDni(file)
                            }
                        }} style={{ padding: 5, marginBottom: 10, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{dni!=null?dni.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Buró de crédito</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setBuro(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{buro!=null?buro.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Precalificación hipotecaria</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setPrecalification(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{precalification!=null?precalification.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Mecanizado del IESS</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMecanizado(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mecanizado!=null?mecanizado.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
               

                  

                     {
                     data.client.other_income != 0 && data.client.other_income != null ? (
                         <React.Fragment>

<Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 15,marginTop:5,borderBottomWidth:1,borderBottomColor:'gray' }}>OTROS INGRESOS</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>RUC/RICE</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRucFilesO(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rucFilesO!=null?rucFilesO.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                   
                        {
                            data.client.other_monthly_iva==1?
                                <View>

                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFileO(file)
                            }
                        }}  style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFileO!=null?ivaDeclarationFileO.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile2O(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile2O!=null?ivaDeclarationFile2O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile3O(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile3O!=null?ivaDeclarationFile3O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile4O(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile4O!=null?ivaDeclarationFile4O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile5O(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile5O!=null?ivaDeclarationFile5O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile6O(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile6O!=null?ivaDeclarationFile6O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View>


                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFileO(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                        <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFileO!=null?ivaDeclarationFileO.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                 
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del impuesto a la renta (último año)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRentaDeclarationFileO(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rentaDeclarationFileO!=null?rentaDeclarationFileO.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Movimientos de cuenta (últimos 3 meses)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFileO(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFileO!=null?accounMovFileO.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFile2O(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFile2O!=null?accounMovFile2O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFile3O(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFile3O!=null?accounMovFile3O.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        </React.Fragment>
                        )
                        :null
                        }
                    </View>
                   
                    :
                    <View style={{ marginHorizontal: '5%', marginTop: 10 }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Por favor, adjuntar los documentos requeridos.</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Cédula</Text>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setDni(file)
                            }
                        }}  style={{ padding: 5, marginBottom: 10, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{dni!=null?dni.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Buró de crédito</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setBuro(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{buro!=null?buro.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Precalificación hipotecaria</Text>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setBuro(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{precalification!=null?precalification.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>RUC/RICE</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRuc(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ruc!=null?ruc.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        {
                            data.client.monthly_iva==1?
                                <View>

                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva(file)
                            }
                        }}  style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva!=null?iva.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva2(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva2!=null?iva2.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva3(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva3!=null?iva3.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva4(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva4!=null?iva4.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva5(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva5!=null?iva5.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva6(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva6!=null?iva6.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View>


                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                        <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva!=null?iva.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del impuesto a la renta (último año)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRent(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rent!=null?rent.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Movimientos de cuenta (últimos 3 meses)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMov(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mov!=null?mov.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMov2(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mov2!=null?mov2.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMov3(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mov3!=null?mov3.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                    </View>
                  
                  :null
                }
                      {
                           data.client!=null?
                           data.client.civil == 'CASADO(A)' || data.client.civil == 'UNION DE HECHO'?
                           data.spouse!= null ?
                           data.spouse.dependence == 1 ?
                            <View style={{marginHorizontal:'5%'}}>
                                  <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', backgroundColor: '#F8F8F8', marginBottom: 10, }}></View>
                                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Datos del cónyuge</Text>
                                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Cédula</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setDniS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{dniS!=null?dniS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Buró de crédito</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setBuroS(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{buroS!=null?buroS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Precalificación hipotecaria</Text>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setPrecalificationS(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{precalificationS!=null?precalificationS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Mecanizado del IESS</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMecanizadoS(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mecanizadoS!=null?mecanizadoS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                       {/*  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>3 Últimos roles de pago</Text>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRol1S(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rol1S!=null?rol1S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRol2S(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rol2S!=null?rol2S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRol3S(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rol3S!=null?rol3S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                            */}



                              {
                     data.spouse.other_income != 0 && data.spouse.other_income != null ? (
                         <React.Fragment>

<Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 15,marginTop:5,borderBottomWidth:1,borderBottomColor:'gray' }}>OTROS INGRESOS</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>RUC/RICE</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRucFilesOS(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rucFilesOS!=null?rucFilesOS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                   
                        {
                            data.spouse.other_monthly_iva==1?
                                <View>

                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFileOS(file)
                            }
                        }}  style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFileOS!=null?ivaDeclarationFileOS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile2OS(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile2OS!=null?ivaDeclarationFile2OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile3OS(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile3OS!=null?ivaDeclarationFile3OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile4OS(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile4OS!=null?ivaDeclarationFile4OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile5OS(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile5OS!=null?ivaDeclarationFile5OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFile6OS(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFile6OS!=null?ivaDeclarationFile6OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View>


                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                    <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaDeclarationFileOS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                        <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaDeclarationFileOS!=null?ivaDeclarationFileOS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                 
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del impuesto a la renta (último año)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRentaDeclarationFileOS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rentaDeclarationFileOS!=null?rentaDeclarationFileOS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Movimientos de cuenta (últimos 3 meses)</Text>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFileOS(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFileOS!=null?accounMovFileOS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFile2OS(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFile2OS!=null?accounMovFile2OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setAccountMovFile3OS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{accounMovFile3OS!=null?accounMovFile3OS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                        </TouchableOpacity>
                        </React.Fragment>
                        )
                        :null
                        }
                            </View>
                            :
                            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Datos del cónyuge</Text>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Por favor, adjuntar los documentos requeridos.</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Cédula</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setDniS(file)
                            }
                        }} style={{ padding: 5, marginBottom: 10, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{dniS!=null?dniS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Buró de crédito</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setBuroS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{buroS!=null?buroS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Precalificación hipotecaria</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setPrecalificationS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{precalificationS!=null?precalificationS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>RUC/RICE</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRucS(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rucS!=null?rucS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            {
                                data.spouse.monthly_iva==1 ?
                                    <View>
    
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                        <View style={{ flexDirection: 'row' }}>
    
                                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaS(file)
                            }
                        }}  style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaS!=null?ivaS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva2S(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva2S!=null?iva2S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                        </View>
    
                                        <View style={{ flexDirection: 'row' }}>
    
                                            <TouchableOpacity  onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva3S(file)
                            }
                        }}  style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva3S!=null?iva3S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva4S(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva4S!=null?iva4S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
    
                                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva5S(file)
                            }
                        }} style={{ marginBottom: 5, marginRight: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva5S!=null?iva5S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIva6S(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{iva6S!=null?iva6S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                    :
                                    <View>
    
    
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del IVA (6 meses)</Text>
                                        <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setIvaS(file)
                            }
                        }}   style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                            <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ivaS!=null?ivaS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Declaración del impuesto a la renta (último año)</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setRentS(file)
                            }
                        }}  style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{rentS!=null?rentS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Movimientos de cuenta (últimos 3 meses)</Text>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMovS(file)
                            }
                        }} style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{movS!=null?movS.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMov2S(file)
                            }
                        }}  style={{ marginBottom: 5, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mov2S!=null?mov2S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async()=>{
                            const result = await DocumentPicker.getDocumentAsync({});
                            if (!result.cancelled && result.type !== 'cancel' ) {
                                let file = { uri: result.uri, name: result.name, type:'application/pdf' }
                                setMov3S(file)
                            }
                        }} style={{ marginBottom: 10, padding: 5, paddingVertical: 10, backgroundColor: '#EEEEEE', borderRadius: 13, flexDirection: 'row', }}>
                                <Feather name="upload" size={19} style={{ marginHorizontal: 10 }} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{mov3S!=null?mov3S.name.substring(0,3)+'...':"Adjuntar archivo"}</Text>
                            </TouchableOpacity>
                        </View>
                        :null
                        :null
                      :null}

<TouchableOpacity
                    style={{ marginHorizontal:'5%',borderRadius: 10, marginBottom: 10, backgroundColor: '#323B62', padding: 13 }}
                  onPress={subir}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   SUBIR</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
