import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './container/login/Login'
import Main from './container/main/Main'
import Lead from './container/lead/Lead'
import Profile from './container/profile/Profile'

import Citations from './container/main/Citations'
import Citation from './container/main/CitationEdit'
import CitationNew from './container/main/CitationNew'
import CitationList from './container/lead/Citations'
import SendMessage from './container/lead/SendMessage'
import Client from './container/lead/Client'
import ClientCreate from './container/lead/ClientCreate'
import Upload from './container/lead/Upload'
import Precalificator from './container/lead/Precalificator'
import Visor from './container/lead/Visor'
import Cotizar from './container/lead/Cotizar'


import ClientEdit from './container/lead/ClientEdit'
import CallsList from './container/lead/Calls'
import theme from './config/theme'
import Store from './store/Store'
import Initializer from './store/Initializer'

import {cerrarSesion} from './utils/API/auth'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerMenu() {
  return (

      <Drawer.Navigator  >
        <Drawer.Screen name="Main" component={Main}  options={{ title: 'Citas' }}/>
        <Drawer.Screen name="Lead" component={Lead}  options={{ title: 'Clientes' }}/>
        <Drawer.Screen name="Profile" component={Profile}  options={{ title: 'Perfil' }}/>

      </Drawer.Navigator>

  );
}


function MainContainer(props){
  const initializer = React.useContext(Initializer);
  return(
  <NavigationContainer>
  <Stack.Navigator   screenOptions={{
    headerShown: false
  }}>
{
  initializer.usuario!=null?
<React.Fragment >
<Stack.Screen name="Drawer" component={DrawerMenu} />
    <Stack.Screen name="Citations" component={Citations} />
    <Stack.Screen name="Citation" component={Citation} />
    <Stack.Screen name="CitationNew" component={CitationNew} />
    <Stack.Screen name="CitationList" component={CitationList} />
    <Stack.Screen name="SendMessage" component={SendMessage} />
    <Stack.Screen name="Client" component={Client} />
    <Stack.Screen name="ClientCreate" component={ClientCreate} />
    <Stack.Screen name="ClientEdit" component={ClientEdit} />
    <Stack.Screen name="Upload" component={Upload} />
    <Stack.Screen name="Precalificator" component={Precalificator} />
    <Stack.Screen name="CallsList" component={CallsList} />
    <Stack.Screen name="Visor" component={Visor} />
    <Stack.Screen name="Cotizar" component={Cotizar} />

    
    
</React.Fragment>

   

    :
    <Stack.Screen name="Login" component={Login} />
}
   
  
  </Stack.Navigator>
</NavigationContainer>)
}
export default function App() {

  return (
    <ThemeProvider theme={theme}>
    <ToastProvider>
      <Store>
      

          <MainContainer/>


      </Store>
 
      </ToastProvider>
        </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
