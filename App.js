import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import Historial from './screens/Historial';
import Ajustes from './screens/Ajustes';
import Scenes from './screens/Scenes';
import Login from './screens/Login';
import Register from './screens/Register';
import AgregarDispositivo from './screens/AgregarDispositivo';
import Temperatura from './screens/Temperatura';
import Clima from './screens/Clima';
import Ubicacion from './screens/Ubicacion';
import Contacto from './screens/Contacto';
import Emergencias from './screens/Emergencias';

const AuthStack = createNativeStackNavigator();
function LoginStack(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name="Iniciar sesión" component={Login}/>
      <AuthStack.Screen name="Registrar" component={Register}/>
    </AuthStack.Navigator>
  );
}

const HomeStackNav = createNativeStackNavigator();
function HomeStack(){
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen name="HomeMain" component={Home} options={{ title: 'Home' }}/>
      <HomeStackNav.Screen
        name="AgregarDispositivo"
        component={AgregarDispositivo}
        options={{ title: 'Agregar dispositivo' }}
      />
    </HomeStackNav.Navigator>
  );
}

const ScenesStackNav = createNativeStackNavigator();
function ScenesStack(){
  return (
    <ScenesStackNav.Navigator>
      <ScenesStackNav.Screen name="ScenesMain" component={Scenes} options={{ title: 'Scenes' }}/>
      <ScenesStackNav.Screen name="Clima" component={Clima} options={{ title: 'Clima' }}/>
      <ScenesStackNav.Screen name="Temperatura" component={Temperatura} options={{ title: 'Temperatura' }}/>
      <ScenesStackNav.Screen name="Ubicacion" component={Ubicacion} options={{ title: 'Ubicación' }}/>
      <ScenesStackNav.Screen name="Contacto" component={Contacto} options={{ title: 'Contacto' }}/>
      <ScenesStackNav.Screen name="Emergencias" component={Emergencias} options={{ title: 'Emergencias' }}/>
    </ScenesStackNav.Navigator>
  );
}

const HistorialStackNav = createNativeStackNavigator();
function HistorialStack(){
  return (
    <HistorialStackNav.Navigator>
      <HistorialStackNav.Screen name="HistorialMain" component={Historial} options={{ title: 'Historial' }}/>
      {/* ...pantallas relacionadas con Historial */}
    </HistorialStackNav.Navigator>
  );
}

const AjustesStackNav = createNativeStackNavigator();
function AjustesStack(){
  return (
    <AjustesStackNav.Navigator>
      <AjustesStackNav.Screen name="AjustesMain" component={Ajustes} options={{ title: 'Ajustes' }}/>
      {/* ...pantallas relacionadas con Ajustes */}
    </AjustesStackNav.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function Tabs(){
  return (
    // ocultamos el header del tab para que cada stack muestre su propio header
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="Scenes" component={ScenesStack}/>
      <Tab.Screen name="Historial" component={HistorialStack}/>
      <Tab.Screen name="Ajustes" component={AjustesStack}/>
    </Tab.Navigator>
  )
}

const RootStack = createNativeStackNavigator();
function AppStack(){
  return(
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
      {/* ...si necesitas otras pantallas globales, agrégalas aquí */}
    </RootStack.Navigator>
  );
}

export default function App() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack/> : <LoginStack/> }
    </NavigationContainer>
  );
}
