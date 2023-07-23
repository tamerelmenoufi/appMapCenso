import react, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { string } from 'yup';

const {width} = Dimensions.get('window')

export default function Selection({sequencia, titulo, listaGeral, onchangeSelect, text, value}){

    const [txt, setTxt] = useState(text)
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(value)
    onchangeSelect(value)
    function renderOption({item}){
        return (
            <View>
                <TouchableOpacity
                    style={{
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            padding:16,
                            borderBottomColor:'#ccc',
                            borderBottomWidth:1,
                            backgroundColor:item.codigo === selected?'#eee':'#fff'
                            }}
                    onPress={()=>{
                        onchangeSelect(item.codigo)
                        setTxt(item.nome)
                        setModal(false)
                        setSelected(item.codigo)
                    }}
                >
                    <Text>{item.nome}</Text>
                    {item.codigo === selected && (<Icon name="check" size={16} color={'#ccc'} />)}
                </TouchableOpacity>
            </View>

        )
    }
    return(
        <View style={Styles.container}>
            <Text style={Styles.titulo}>{sequencia}. {titulo}</Text>
            <TouchableOpacity style={Styles.select} onPress={()=>setModal(true)}>
                <Text style={Styles.txt} numberOfLines={1}>{txt}</Text>
                <Icon name="chevron-down" size={17} color={'#555'} />
            </TouchableOpacity>
            <Modal
                animationType="slide" visible={modal} onRequestClose={()=>setModal(false)}
            >
                <SafeAreaView>
                    <View style={Styles.headerModal}>
                        <TouchableOpacity onPress={()=>setModal(false)}>
                            <Icon name="chevron-left" size={26} color='#555' />
                        </TouchableOpacity>
                        <Text>Selecione uma opção</Text>
                        <TouchableOpacity onPress={()=>setModal(false)}>
                            <Text>Canelar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={listaGeral}
                        keyExtractor={(item) => String(item.codigo)}
                        renderItem={(item) => renderOption(item)}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingHorizontal:12,
        marginBottom:20,
        // borderColor:'red',
        // borderWidth:1
    },
    select:{
        paddingHorizontal:12,
        backgroundColor:'#eee',
        borderWidth:1,

        height:45,
        fontSize:17,
        borderRadius:10,

        borderColor:'#eee',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    txt:{
        color:'#555',
        fontSize:17,
        marginRight:36,
        width: width - 130
    },
    headerModal:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        padding:12,
        height:60
    },
    titulo:{
        color:'#333',
        fontSize:17,
        marginBottom:5,
    },
})