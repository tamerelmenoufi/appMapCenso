import react, {useState, useMemo, useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
// import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TerlaIncial from './src/telas/inicial';
import Autentica from './src/telas/login';
import Beneficiados from './src/telas/beneficiados';
import Form from './src/telas/form';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inicial'>
        <Stack.Screen name="Inicial" component={TerlaIncial} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Autentica} options={{headerShown:false}} />
        <Stack.Screen name="Beneficiados" component={Beneficiados} options={{title:'Lista dos Beneficiados'}} />
        <Stack.Screen name="Form" component={Form} options={{title:'Formulário de Pesquisa'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
