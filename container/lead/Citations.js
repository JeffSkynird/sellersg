import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { obtenerTodosPorLeadList } from '../../utils/API/citation'
import Initializer from '../../store/Initializer'
import { dateFormatA, getHours } from '../../utils/Date'
const windowHeight = Dimensions.get('window').height;
export default function Citations({ route, navigation }) {
    const initializer = React.useContext(Initializer);
    const { lead_id } = route.params;
    const [serch, setSearch] = React.useState("")
    const [data, setData] = React.useState({ data: [], backup: [] })
    const [refreshing, setRefreshing] = React.useState(true)
    const [selected, setSelected] = React.useState(true)

    React.useEffect(() => {
        obtenerTodosPorLeadList(lead_id, setData, setRefreshing, initializer)

    }, [])
    function onRefresh() {



        obtenerTodosPorLeadList(lead_id, setData, setRefreshing, initializer)
    }
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Citation', { id: item.id })} style={{ backgroundColor: '#F8F8F8', padding: 10, borderRadius: 10, marginHorizontal: '5%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#808080' }}>{item.description}</Text>
                        <View style={{ borderBottomColor: '#D2D2D2', borderBottomWidth: 1 }}></View>
                    </View>
                    <View style={{ backgroundColor: '#323B62', paddingHorizontal: 4, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Efectiva: {item.is_effective == 1 ? 'Sí' : 'No'}</Text>
                    </View>

                </View>
                <Text style={{ marginTop: 3, color: '#808080', fontSize: 15 }}>{dateFormatA(new Date(item.date))} {getHours(new Date(item.date))}</Text>




            </TouchableOpacity>

        )
    }
    const searching = (text) => {

        let dataB = data.backup.filter(l => {
            return l.title.toLowerCase().match(text.toLowerCase());
        });
        setData({ data: dataB, backup: data.backup })
        setSearch(text)
    }
    const filtrar = (text) => {
        if(text==0){
            setData({ data: data.backup, backup: data.backup })
        }else{
            let dataB = data.backup.filter(l => {
                return l.is_effective==1;
            });
            setData({ data: dataB, backup: data.backup })
          
        }
       
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Lista de citas</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 40, width: 40, height: 40, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}><Feather name="arrow-left" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 15, borderRadius: 16, backgroundColor: '#EEEEEE', flexDirection: 'row', height: 50, marginHorizontal: '5%', marginTop: 15, alignItems: 'center' }}>
                <Feather name="search" size={24} color="#939393" />

                <TextInput
                    style={{ marginLeft: 10, fontSize: 16, color: '#939393' }}
                    onChangeText={text => searching(text)}
                    value={serch}
                    placeholder="Buscar"
                />
            </View>
            <View style={{ paddingLeft: 15, flexDirection: 'row', marginTop: 10 }}>


                <TouchableOpacity
                    onPress={() => {
                        setSelected('1')
                        filtrar(0)
                    }}
                    style={{ backgroundColor: selected == '1' ? '#323B62' : '#EEEEEE', marginRight: 10, borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: selected == '1' ? 'white' : '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="calendar" size={18} color={selected == '1' ? 'white' : '#323B62'} /> Agendadas</Text>
                </TouchableOpacity>




                <TouchableOpacity


                    onPress={() => {
                        setSelected('2')
                        filtrar(1)
                    }}
                    style={{ backgroundColor: selected == '2' ? '#323B62' : '#EEEEEE', borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: selected == '2' ? 'white' : '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="check-circle" size={18} color={selected == '2' ? 'white' : '#323B62'} /> Efectivas</Text>
                </TouchableOpacity>




            </View>
            <View style={{ marginTop: 15 }}>
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


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
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
