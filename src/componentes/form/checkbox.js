import react, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Checkbox({sequencia, titulo, opcoes, defaultValue, onChange, multiplo=false}) {

    opcoesAtual = defaultValue.split(',')

    const [selected, setSelected] = useState(opcoesAtual);

    // console.log(opcoesAtual)

    useEffect(()=>{
        onChange(selected)
    },[selected])

    
    function selecione(valor){
        let index = selected.findIndex(i => i === valor)
        let arraySelecteds = [...selected]
        // let arraySelecteds = []
        if(index !== -1){
            arraySelecteds.splice(index, 1)
        }else{
            multiplo ? arraySelecteds.push(valor) : arraySelecteds = [valor]
        }
        setSelected(arraySelecteds)
        onChange(arraySelecteds)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{sequencia}. {titulo}</Text>
            {opcoes.map((op, index)=>(
                <TouchableOpacity
                    style={styles.opcao}
                    onPress={()=>selecione(op?.valor)}
                >
                    {
                        selected.findIndex(i => i === op.valor) !== -1 ?
                        (
                            <Icon name='square-full' style={[styles.opcaoIcone, {color:'green'}]} />
                        ) : (
                            <Icon name='square-full' style={[styles.opcaoIcone]} />
                        )
                    }

                    <Text style={styles.opcaoText}>{op?.nome}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        // borderColor:'#333',
        // borderWidth:1,
        paddingHorizontal:12,
        marginBottom:20,
    },
    titulo:{
        color:'#333',
        fontSize:17,
        marginBottom:5,
    },
    opcao:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'left',
        padding:4,
    },
    opcaoText:{
        marginLeft:5,
        fontSize:16,
    },
    opcaoIcone:{
        width:18,
        height:18,
        fontSize:17,
        color:'#ccc'
    }
})