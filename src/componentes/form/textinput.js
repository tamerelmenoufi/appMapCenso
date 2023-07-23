import react, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function FormImput({sequencia, titulo, errors, onChangeText, onBlur, value, defaultValue, setValue, placeholder, disabled, password}){
       
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>{(sequencia)?`${sequencia}. `:false}{titulo}</Text>
            {(disabled)?(<Text style={[styles.campo, {paddingTop:9}]}>{defaultValue}</Text>):(<><TextInput
            style={[styles.campo ,{
                borderWidth: errors.nome2 && 1,
                borderColor: errors.nome2 && 'red'
            }]}

            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
            setValue={setValue}
            secureTextEntry={(password)?true:false}
          />
          {errors.nome2 && <Text>{errors.nome2?.message}</Text>}</>)}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      alignItems: 'left',
      justifyContent: 'center',
      paddingHorizontal:12,
      marginBottom:20,
    },
    campo:{
      backgroundColor: '#eee',
      paddingHorizontal:12,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:'#ccc',
      borderWidth:1,
      height:45,
      fontSize:17,
      borderRadius:10,
    },
    titulo:{
        color:'#333',
        fontSize:17,
        marginBottom:5,
    },
  });
