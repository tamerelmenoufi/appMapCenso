import { View, Text, Image, TouchableOpacity } from 'react-native';
import axiusGet from '../componentes/axios/get';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormImput from '../componentes/form/textinput';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const validacoes = yup.object({
    // nome1:yup.string().required("Informe seu nome"),
    // nome2:yup.string().required("Informe seu nome2"),
    // email:yup.string().email("E-mail inválido").required("Informe seu e-mail"),
    // senha:yup.string().min(6,"No minimo 6 digitos").required("Digite a senha")
  })

export default function Autentica({navigation}){

    useEffect(()=>{
        // axiusGet();
    },[])


    const {control, handleSubmit, formState: { errors }, } = useForm({
        resolver:yupResolver(validacoes)
      })

    return (
        <View style={{flex:1, alignContent:'center', justifyContent:'center', backgroundColor:'#fff'}}>
            <Image source={require('../img/logo.png')} />
            <Controller
                control={control}
                name="nome"
                render={({field:{onChange, onBlur, value}})=>(
                    <FormImput
                    errors={errors}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Nome"
                    titulo="Informe seu login"
                    sequencia=""
                    />
                )}
            />
            <Controller
                control={control}
                name="senha"
                render={({field:{onChange, onBlur, value}})=>(
                    <FormImput
                    errors={errors}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Senha"
                    titulo="Digite a sua senha"
                    sequencia=""
                    password
                    />
                )}
            />
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Beneficiados')} style={{flexDirection:'row', backgroundColor:'green', marginBottom:15, borderRadius:8, padding:12, justifyContent:'center', alignItems:'center', marginStart:12, marginEnd:3, flex:1}}>
                    <Icon name='key' style={{color:'#fff', fontSize:15, marginRight:12}} />
                    <Text style={{color:'#fff', fontWeight:'bold'}}>Logar </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('Inicial')} style={{flexDirection:'row', backgroundColor:'red', marginBottom:15, borderRadius:8, padding:12, justifyContent:'center', alignItems:'center', marginEnd:12,  marginStart:3, flex:1}}>
                    <Icon name='key' style={{color:'#fff', fontSize:15, marginRight:12}} />
                    <Text style={{color:'#fff', fontWeight:'bold'}}>Cancelar </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}