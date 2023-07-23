import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axiusGet from '../componentes/axios/get';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TerlaIncial({ navigation }){


    useEffect(()=>{
        // axiusGet();
    },[])

    return (
        <View style={{flex:1, alignContent:'center', justifyContent:'center', backgroundColor:'#fff'}}>
            <Image source={require('../img/logo.png')} />
            <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{flexDirection:'row', backgroundColor:'green', marginBottom:15, borderRadius:8, padding:12, justifyContent:'center', alignItems:'center', marginHorizontal:12,}}>
                <Icon name='user' style={{color:'#fff', fontSize:15, marginRight:12}} />
                <Text style={{color:'#fff', fontWeight:'bold'}}>Login de Acesso </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flexDirection:'row', backgroundColor:'green', padding:12, borderRadius:8, justifyContent:'center', alignItems:'center', marginHorizontal:12,}}>
                <Icon name='user' style={{color:'#fff', fontSize:15, marginRight:12}} />
                <Text style={{color:'#fff', fontWeight:'bold'}}>Acionar o banco </Text>
            </TouchableOpacity> */}

        </View>
    )
}