import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { SQLiteProvider } from 'expo-sqlite';

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
import CuentaAjuste from './screens/CuentaAjuste';
import UbicacionAjuste from './screens/UbicacionAjuste';
import ContactosAjuste from './screens/ContactosAjuste';
import NotificacionesAjuste from './screens/NotificacionesAjuste';

// Inicializa Firebase solo una vez
const firebaseConfig = {
    apiKey: "AIzaSyAU3mRgL465cBZZXwZimnUwt9pWheYUkoA",
    authDomain: "aircare-protection.firebaseapp.com",
    projectId: "aircare-protection",
    storageBucket: "aircare-protection.firebasestorage.app",
    messagingSenderId: "90031869318",
    appId: "1:90031869318:ios:5f4b946b5db364c5f0f007"
};
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    // ya inicializado
}

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
      <AjustesStackNav.Screen name="CuentaAjuste" component={CuentaAjuste} options={{ title: 'Cuenta' }}/>
      <AjustesStackNav.Screen name="UbicacionAjuste" component={UbicacionAjuste} options={{ title: 'Ubicación' }}/>
      <AjustesStackNav.Screen name="ContactosAjuste" component={ContactosAjuste} options={{ title: 'Contactos' }}/>
      <AjustesStackNav.Screen name="NotificacionesAjuste" component={NotificacionesAjuste} options={{ title: 'Notificaciones' }}/>
    </AjustesStackNav.Navigator>
  );
}

const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#636891',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Scenes':
              iconName = focused ? 'monitor-dashboard' : 'monitor-dashboard';
              break;
            case 'Historial':
              iconName = focused ? 'history' : 'history';
              break;
            case 'Ajustes':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Scenes" component={ScenesStack} />
      <Tab.Screen name="Historial" component={HistorialStack} />
      <Tab.Screen name="Ajustes" component={AjustesStack} />
    </Tab.Navigator>
  );
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
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    // Puedes mostrar un loader/spinner aquí si quieres
    return null;
  }

  return (
    <SQLiteProvider
      databaseName='aircare_protection.db'
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS dispositivos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            foto TEXT
          );
          CREATE TABLE IF NOT EXISTS historial (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descripcion TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS climaConfig (
            id INTEGER PRIMARY KEY CHECK (id = 0),
            noticacionClima INTEGER DEFAULT 1,
            minimaTemp INTEGER DEFAULT 0,
            maximaTemp INTEGER DEFAULT 40
          );
          CREATE TABLE IF NOT EXISTS temperatura (
            id INTEGER PRIMARY KEY CHECK (id = 0),
            notificacionTemp INTEGER DEFAULT 1,
            minimaTemp INTEGER DEFAULT 5,
            maximaTemp INTEGER DEFAULT 35
          );
          
          PRAGMA journal_mode=WAL;
          `);
        }}
      options={{ useNewConnection: false }}
    >
      <NavigationContainer>
        {isAuthenticated ? <AppStack/> : <LoginStack/> }
      </NavigationContainer>
    </SQLiteProvider>
  );
}
