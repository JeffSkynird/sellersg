import React,{useState} from 'react'
import { View, TextInput,Text,FlatList ,StyleSheet,RefreshControl,ImageBackground,Image,Dimensions,TouchableOpacity,Switch} from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import Initializer from '../../store/Initializer'
import { obtenerLeadsPorAsesor2,obtenerTelefonosCliente } from "../../utils/API/leads.js";
import {registrarLlamadas} from '../../utils/API/calls'
import { SwipeablePanel } from 'rn-swipeable-panel';
import {Linking} from 'react-native'
import { useToast } from 'react-native-styled-toast'
import ProgressLoader from 'rn-progress-loader';

const windowHeight = Dimensions.get('window').height;

export default function Lead(props) {
    const { toast } = useToast()
    const initializer = React.useContext(Initializer);
    const [data,setData] = React.useState({data:[],backup:[]})
    const [refreshing,setRefreshing] = React.useState(true)
    const [selectedPhone,setSelectedPhone] = React.useState("")
    const [successCall,setSuccessCall] = React.useState("")
    const [loading, setLoading] = React.useState(false);

    const [effectiveCall,setEffectiveCall] = React.useState(false)

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
    openLarge: false,onlySmall:true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
      });
      const [isPanelActive, setIsPanelActive] = useState(false);
      const [leadSelect, setLeadSelect] = useState(0);
      const [phones, setPhones] = useState({phone1:"",phone2:""});
      const [serch, setSearch] = React.useState("")

      React.useEffect(()=>{
       
        if(isPanelActive&&leadSelect!=0){
          
            obtenerTelefonosCliente(leadSelect,setPhones,initializer)
        }
      },[isPanelActive,leadSelect])
      function onRefresh() {
      
      
        
        obtenerLeadsPorAsesor2(setData,initializer,setRefreshing)
      }
      const mostrarNotificacion=(msg,type)=>{
        
            toast({ message:msg, bg: type, color: type,iconColor: type, iconName: type=="error"?'x-circle':'check-circle',  })
            if(type!="error"){
                setSelectedPhone('')
                setEffectiveCall(false)

            }
       

    }
      const openPanel = (it) => {
       
        setIsPanelActive(true);
        setLeadSelect(it)
      };
      const registrarCalls = () => {
      
        registrarLlamadas({lead_id:leadSelect,is_effective:effectiveCall?1:0,destination:selectedPhone},initializer,mostrarNotificacion,setLoading)
      };
    
      const closePanel = () => {
        setIsPanelActive(false);
      };
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerLeadsPorAsesor2(setData, initializer,setRefreshing);
        }
      }, [initializer.usuario]);
    const renderItem = ({ item }) => {
        let firstName = item.nombres.split(' ')[0];
       let  lastName = item.apellidos.split(' ')[0];
    
        return (
           <View style={{paddingHorizontal:10,marginVertical:5,justifyContent:'space-between',flexDirection:'row'}}>
               <Text style={{fontSize:17}}>{item.cedula} - {firstName} {lastName}</Text>
               <View style={{flexDirection:'row'}}>
               
                <TouchableOpacity onPress={()=>props.navigation.navigate('Client',{lead_id:item.id})} style={{marginRight:3}} ><Feather name="user" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('SendMessage',{lead_id:item.id,dni:item.dni,client_id:item.client_id})} style={{marginRight:3}} ><Feather name="dollar-sign" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>openPanel(item.id)} style={{marginRight:3}}><Feather name="phone" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('CitationList',{lead_id:item.id})} style={{marginRight:3}} ><Feather name="calendar" size={24} color="black" /></TouchableOpacity>
                
               </View>
            
           </View>
           

        )
    }
    const searching = (text) => {
        if(!isNaN(text)){
            let dataB = data.backup.filter(l => {
                return l.cedula.includes(text);
            });
            setData({ data: dataB, backup: data.backup })
            setSearch(text)
         }else{
            let dataB = data.backup.filter(l => {
                return l.nombres.toLowerCase().match(text.toLowerCase());
            });
            setData({ data: dataB, backup: data.backup })
            setSearch(text)
         }
        
    }
  
    React.useEffect(() => {
        if(props.route.params!=undefined&&props.route.params!=null){
     
            if(props.route.params.hasOwnProperty("refresh")){
                obtenerLeadsPorAsesor2(setData, initializer,setRefreshing);
            }
        }
    }, [props.route.params])
    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
            
             <View style={styles.header}>
                    <TouchableOpacity  ><Feather name="menu" size={24} color="white" onPress={()=>props.navigation.openDrawer()}/></TouchableOpacity>
                    <Text style={{ color: 'white',fontSize:18 }}>Mis clientes</Text>
                    <Image style={{ height: 30, width: 80 }} source={require('../../assets/LogoAmbiensaWhite.png')} />

                </View>
                <View >
                    <View style={{backgroundColor:'#F4F5F7',flexDirection:'row',margin:10,justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#E8505C', height: 15, width: 15, borderRadius: 20, marginRight: 10 }} />
                            <Text style={{ fontSize: 20 }} >Mis clientes</Text>
                        </View>
                        <View style={{ backgroundColor: '#E8505C', borderRadius: 5, padding: 5, height: 18,  justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{data.data.length}</Text>
                        </View>

                    </View>
                    <View style={{ paddingLeft: 15,marginBottom:10,borderRadius: 16, backgroundColor: '#EEEEEE', flexDirection: 'row', height: 50, marginHorizontal: '5%', marginTop: 5, alignItems: 'center' }}>
                <Feather name="search" size={24} color="#939393" />

                <TextInput
                    style={{ marginLeft: 10, fontSize: 16, color: '#939393' }}
                    onChangeText={text => searching(text)}
                    value={serch}
                    placeholder="Buscar"
                />
            </View>
                    <FlatList
                    data={data.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                          //refresh control used for the Pull to Refresh
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                />
                </View>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                <TouchableOpacity
                 onPress={()=>props.navigation.navigate('ClientCreate')}
                   style={{width:250,marginBottom:15,borderRadius: 10,  marginHorizontal: '5%', backgroundColor: '#323B62', padding: 13 }}
               >
                   <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="plus" size={18} color="white" />   NUEVO</Text>
               </TouchableOpacity>
                </View>
                <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <View style={{margin:15}}>
                    <Text style={{fontWeight:'bold',fontSize:18,marginBottom:15}}>Seleccione un número para llamar</Text>
                    {
                        selectedPhone==""?
                            <View >
                                  <TouchableOpacity onPress={()=>{
                        Linking.openURL(`tel:${phones.phone1}`)
                        setSelectedPhone(phones.phone1)
                
                }} ><Text style={{fontWeight:'bold',fontSize:26}}>{phones.phone1!=""&&phones.phone1!="N/A"?phones.phone1:""}</Text></TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{
                        Linking.openURL(`tel:${phones.phone2}`)
                        setSelectedPhone(phones.phone2)
                    }}  ><Text style={{fontWeight:'bold',fontSize:26}}>{phones.phone2!=""&&phones.phone2!="N/A"?phones.phone2:""}</Text></TouchableOpacity>
                       <TouchableOpacity
                        style={{ borderRadius: 10,width:'100%', marginTop: 20, backgroundColor: '#323B62', padding: 13 }}
                     onPress={()=>props.navigation.navigate('CallsList',{lead_id:leadSelect})}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="phone-call" size={18} color="white" />   Ver historial</Text>
                    </TouchableOpacity>
                            </View>
                            
                        :
                        <View >
                             
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10,}}>¿Fue efectiva?</Text>
                        <Switch
                      
                            trackColor={{ false: "#767577", true: "#323B62" }}
                            thumbColor={effectiveCall ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            style={{ marginBottom: 15 }}
                            onValueChange={text => setEffectiveCall(!effectiveCall)}
                            value={effectiveCall}
                        />
                    </View>
                    <Text style={{ color: 'black',fontSize:16,fontStyle:'italic'  }}>* Sólo guarde si realizó la llamada</Text>
                    <View style={{flexDirection:'row',alignItems:'baseline',marginTop:15}}>
                    <TouchableOpacity
                        style={{width:'85%',marginRight:10, borderRadius: 10, marginTop: 15, backgroundColor: '#323B62', padding: 13 }}
                     onPress={registrarCalls}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="save" size={18} color="white" />   Guardar</Text>
                    </TouchableOpacity>
                           
                             <TouchableOpacity
                  onPress={()=>setSelectedPhone('')}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
                    </View>
                    
                   
                        </View>
                        
                    }
                  
                </View>
                    
           
               
            </SwipeablePanel>
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
