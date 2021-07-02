import React, { useState, useEffect, useContext } from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import { View, TouchableOpacity, Text } from 'react-native'
import { tieneArchivos, tieneArchivosS } from "../../../utils/API/clients";
import { Feather } from '@expo/vector-icons';
export default function Subidos(props) {


    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true, onlyLarge: true, onlySmall: false,
        showCloseButton: true,
        onClose: () => props.setIsPanelActive(false),
        onPressCloseButton: () => props.setIsPanelActive(false),
        // ...or any prop you want
    });
    const [files, setFiles] = useState([]);
    const [filesS, setFilesS] = useState([]);
    const [selected, setSelected] = useState('1');
    const [filesFormatted, setFilesFormatted] = useState([]);
    const [filesFormattedN, setFilesFormattedN] = useState([]);
  
    const [filesFormattedS, setFilesFormattedS] = useState([]);
    const [filesFormattedNS, setFilesFormattedNS] = useState([]);
    React.useEffect(() => {

        tieneArchivos(props.client_id, setFiles)
        tieneArchivosS(props.spouse_id, setFilesS)

    }, [props.client_id,props.spouse_id]);
    console.log(files)
console.log(filesS)
    let noSubidos = [
        "cedula",
        "precalificacionHipotecaria",
        // "rolesPagoMecanizado1",
        //"rolesPagoMecanizado2",
        //"rolesPagoMecanizado3",
        "mecanizado",
        "declaracionImpuestoRenta",
        "declaracionIva",
        "rucRice",
        "movimientosCuenta"
    ]
    let noSubidosC = [
        "cedulaS",
        "precalificacionHipotecariaS",
        //"rolesPagoMecanizado1S",
        //"rolesPagoMecanizado2S",
        "mecanizadoS",
        //"rolesPagoMecanizado3S",
        "declaracionImpuestoRentaS",
        "declaracionIvaS",
        "rucRiceS",
        "movimientosCuentaS"
    ]
    let dependienteFS = [
        "cedulaS",
        "precalificacionHipotecariaS",
        //"rolesPagoMecanizado1S",
        "mecanizadoS",
        //"rolesPagoMecanizado2S",
        //"rolesPagoMecanizado3S",
    ]
    let independienteFS = [
        "cedulaS",
        "precalificacionHipotecariaS",
        "declaracionImpuestoRentaS",
        "declaracionIvaS",
        "rucRiceS",
        "movimientosCuentaS"
    ]
    let dependienteF = [
        "cedula",
        "precalificacionHipotecaria",
        //"rolesPagoMecanizado1",
        //"rolesPagoMecanizado2",
        //"rolesPagoMecanizado3",
        "mecanizado",

    ]
    let independienteF = [
        "cedula",
        "precalificacionHipotecaria",
        "declaracionImpuestoRenta",
        "declaracionIva",
        "rucRice",
        "movimientosCuenta"
    ]
    var removeItemFromArr = (arr, item) => {
        var i = arr.indexOf(item);
        i !== -1 && arr.splice(i, 1);
    };


    const estaEnNo = (esta) => {
        let retorno = false
        noSubidos.map((e) => {
            if (esta == e) {
                retorno = true
            }
        })
        return retorno

    }
    const estaEnNoS = (esta) => {
        let retorno = false
        noSubidosC.map((e) => {
            if (esta == e) {
                retorno = true
            }
        })
        return retorno

    }


    React.useEffect(() => {

        if (files.length != 0) {
            let filesF = []
            files.map((e) => {
                if (e == "cedula") {
                    filesF.push("Cédula")
                }
                if (e == "precalificacionHipotecaria") {
                    filesF.push("Buró del credito")
                }
                if (e == "precalification") {
                    filesF.push("Precalificación hipotecaria")
                }
                if (e == "mecanizado") {
                    filesF.push("Mecanizado")
                }
                /*     if(e=="rolesPagoMecanizado1"){
                        filesF.push("Rol de pago (Número 1)")
                    }
                    if(e=="rolesPagoMecanizado2"){
                        filesF.push("Rol de pago (Número 2)")
                    }
                    if(e=="rolesPagoMecanizado3"){
                        filesF.push("Rol de pago (Número 3)")
                    } */
                if (e == "declaracionImpuestoRenta") {
                    filesF.push("Declaración al impuesto a la renta")
                }
                if (e == "declaracionIva") {
                    filesF.push("Declaración al impuesto al valor agregado")
                }
                if (e == "rucRice") {
                    filesF.push("RUC/RICE")
                }

            })
           
            setFilesFormatted(filesF)
        }

    }, [files]);
    React.useEffect(() => {

        if (filesS.length != 0) {
            let filesF = []
            filesS.map((e) => {
                if (e == "cedulaS") {
                    filesF.push("Cédula")
                }
                if (e == "precalificacionHipotecariaS") {
                    filesF.push("Buró del credito")
                }
                /*    
                     if(e=="rolesPagoMecanizado1S"){
                         filesF.push("Rol de pago (Número 1)")
                     } */
                if (e == "mecanizadoS") {
                    filesF.push("Mecanizado")
                }
                if (e == "movimientosCuentaS") {
                    filesF.push("Movimientos de cuenta")
                }
                /*    if(e=="rolesPagoMecanizado2S"){
                       filesF.push("Rol de pago (Número 2)")
                   }
                   if(e=="rolesPagoMecanizado3S"){
                       filesF.push("Rol de pago (Número 3)")
                   } */
                if (e == "declaracionImpuestoRentaS") {
                    filesF.push("Declaración al impuesto a la renta")
                }
                if (e == "declaracionIvaS") {
                    filesF.push("Declaración al impuesto al valor agregado")
                }
                if (e == "rucRiceS") {
                    filesF.push("RUC/RICE")
                }

            })
            setFilesFormattedS(filesF)
        }

    }, [filesS]);
    React.useEffect(() => {
        if (filesS.length != 0) {
            let noSubidosC = []
            if (props.dependenceS == 1) {
                noSubidosC = dependienteFS.slice()
            } else {
                noSubidosC = independienteFS.slice()
            }


            filesS.map((e) => {
                if (estaEnNoS(e)) {
                    removeItemFromArr(noSubidosC, e)
                }
            })
            let filesF = []
            noSubidosC.map((e) => {
                if (e == "cedulaS") {
                    filesF.push("Cédula")
                }
                if (e == "precalificacionHipotecariaS") {
                    filesF.push("Buró del credito")
                }
                /*    if(e=="rolesPagoMecanizado1S"){
                       filesF.push("Rol de pago (Número 1)")
                   }
                   if(e=="rolesPagoMecanizado2S"){
                       filesF.push("Rol de pago (Número 2)")
                   }
                   if(e=="rolesPagoMecanizado3S"){
                       filesF.push("Rol de pago (Número 3)")
                   } */
                if (e == "mecanizadoS") {
                    filesF.push("Mecanizado")
                }
                if (e == "declaracionImpuestoRentaS") {
                    filesF.push("Declaración al impuesto a la renta")
                }
                if (e == "declaracionIvaS") {
                    filesF.push("Declaración al impuesto al valor agreagdo")
                }
                if (e == "rucRiceS") {
                    filesF.push("RUC/RICE")
                }
                if (e == "movimientosCuentaS") {
                    filesF.push("Movimientos de cuenta")
                }
            })

            setFilesFormattedNS(filesF)
        }

    }, [files, props.dependence])
    React.useEffect(() => {
        if (files.length != 0) {
            let noSubidosC = []
            if (props.dependence == 1) {
                noSubidosC = dependienteF.slice()
            } else {
                noSubidosC = independienteF.slice()
            }


            files.map((e) => {
                if (estaEnNo(e)) {
                    removeItemFromArr(noSubidosC, e)
                }
            })
            let filesF = []
            noSubidosC.map((e) => {
                if (e == "cedula") {
                    filesF.push("Cédula")
                }
                if (e == "precalificacionHipotecaria") {
                    filesF.push("Buró del credito")
                }
                if (e == "precalification") {
                    filesF.push("Precalificación hipotecaria")
                }

                /*  if(e=="rolesPagoMecanizado1"){
                     filesF.push("Rol de pago (Número 1)")
                 }
                 if(e=="rolesPagoMecanizado2"){
                     filesF.push("Rol de pago (Número 2)")
                 }
                 if(e=="rolesPagoMecanizado3"){
                     filesF.push("Rol de pago (Número 3)")
                 } */
                if (e == "mecanizado") {
                    filesF.push("Mecanizado")
                }
                if (e == "declaracionImpuestoRenta") {
                    filesF.push("Declaración al impuesto a la renta")
                }
                if (e == "declaracionIva") {
                    filesF.push("Declaración al impuesto al valor agreagdo")
                }
                if (e == "rucRice") {
                    filesF.push("RUC/RICE")
                }
                if (e == "movimientosCuenta") {
                    filesF.push("Movimientos de cuenta")
                }
            })

            setFilesFormattedN(filesF)
        }

    }, [files, props.dependence])
    return (

        <SwipeablePanel {...panelProps} isActive={props.isPanelActive}>
            <View style={{ margin: 15, }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>Archivos subidos</Text>
                <Text style={{ fontSize: 15, fontStyle: 'italic' }}>* Si un documento no es visible, subirlo nuevamente o revisar el
          formato. Los documentos en  <Text style={{ color: 'red' }}>rojo</Text> no están subidos.</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>

             
                        <TouchableOpacity
                            onPress={() => setSelected('1')}
                            style={{backgroundColor: selected == '1' ?'#323B62' : '#EEEEEE', marginRight: 10, borderRadius: 10, height: 40, paddingHorizontal: 10,   justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color:selected == '1' ?'white' : '#323B62', fontWeight: 'bold', textAlign: 'center' }}><Feather name="user" size={18} color={selected == '1' ?'white' : '#323B62' } /> Cliente</Text>
                        </TouchableOpacity>

              

               
                        <TouchableOpacity
                             disabled={props.spouse_id==0}

                            onPress={() => setSelected('2')}
                            style={{ backgroundColor: selected == '2' ?'#323B62' : '#EEEEEE',borderRadius: 10, height: 40, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color:selected == '2' ?'white' : '#323B62',  fontWeight: 'bold', textAlign: 'center' }}><Feather name="users" size={18} color={selected == '2' ?'white' : '#323B62' } /> Cónyuge</Text>
                        </TouchableOpacity>




                </View>
            {selected=='1'?
                <View style={{width:'100%',marginTop:10}}>
                        {
                            filesFormatted.map((e,i) => (
                                <Text key={i} style={{ fontSize:16,marginBottom:5,color: 'black', }}> {e}</Text>
                              

                            ))
                        }
                        {
                            filesFormattedN.map((e,i) => (
                                <Text key={i} style={{ fontSize:16,color: 'red',  }}> {e}</Text>

                            ))
                        }
                    </View>
                    :
                    <View style={{width:'100%',marginTop:10}}>
                    {
                    filesFormattedS.map((e,i)=>(
                        <Text key={i} style={{  fontSize:16,marginBottom:5,color: 'black',  }}> {e}</Text>

                    ))
                }
            {
                    filesFormattedNS.map((e,i)=>(
                        <Text key={i} style={{fontSize:16,color: 'red',  }}> {e}</Text>

                    ))
                }
                    </View>
}
            </View>




        </SwipeablePanel>

    )
}
