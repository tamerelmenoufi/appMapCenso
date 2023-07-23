import react, {useState, useMemo, useEffect} from 'react'
import axios from 'axios';
import { StyleSheet, Text, TextInput, FlatList, TouchableOpacity, View, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import comandoSql from '../componentes/sql/comando'
import FormImput from '../componentes/form/textinput';

export default function Beneficiados({navigation, route}) {

    const [listaGeral, setlistaGeral] = useState([]);
    const [filtro, setFiltro] = useState("'p', 'n', 'i'");
    const [horario, setHorario] = useState('');
    const [titulo, setTitulo] = useState('Todos os Cadastros');
    const [textoBusca, setTextoBusca] = useState('');
    const [filtroTextoBusca, setFiltroTextoBusca] = useState('');
    const [filtroAcao, setFiltroAcao] = useState(` and a.acao != '2'`);

    function OpcFiltro(filtro, opc){

      if(opc == 'p'){
        tit = 'Cadastros Pendentes';
      }else if(opc == 'n'){
        tit = 'Cadastros Não Encontrados';
      }else if(opc == 'i'){
        tit = 'Cadastros Iniciados';
      }else if(opc == 'c'){
        tit = 'Cadastros Concluídos';
      }else{
        tit = 'Todos os Cadastros';
      }

      setFiltro(filtro);
      setTitulo(tit);
    }


    function EnviarNuvem(dados){
      if(!dados){
        comandoSql( `SELECT a.*, b.municipio, c.descricao as bairro_comunidade FROM se a left join municipios b on a.municipio = b.codigo left join bairros_comunidades c on a.bairro_comunidade = c.codigo where a.acao = '0' order by a.nome asc limit 100`)
        .then( retorno => {
            // alert(retorno.rows.length)
            const dados = []
            retorno.rows._array.forEach( c => {
                // results.push(c)
                // console.warn('NÃO TEM:')
                // console.warn(c)
                dados.push(c)
            })
            
        })
      }
      axios
      .post('http://project.mohatron.com/projectSocioEconomico/api/import.php',{
        dados
      })
      .then((response) => {
         alert(response.data);
         let dataEnvio = new Date();
         let dataFormatada = dataEnvio.getFullYear() +
                             "-" +
                             ((dataEnvio.getMonth() + 1)) +
                             "-" +
                             (dataEnvio.getDate()) +
                             " " +
                             (dataEnvio.getHours()) +
                             ":" +
                             (dataEnvio.getMinutes()) +
                             ":" +
                             (dataEnvio.getSeconds())
         if(response.data === 'success'){
          comandoSql( `UPDATE se SET acao = '1' where codigo = '${dados.codigo}'`)
          setHorario(dataFormatada);
         }
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        // alert('Envio completo');
      });

    }

    function executaBusca(){
      setFiltroTextoBusca(` and a.nome like '%${textoBusca}%'`)
    }

    function limparBusca(){
      setFiltro("'p', 'n', 'i'");
      setHorario('');
      setTitulo('Todos os Cadastros');
      setTextoBusca('');
      setFiltroTextoBusca('');
      setFiltroAcao(` and a.acao != '2'`);
    }

    useEffect(()=>{
      comandoSql( `SELECT a.*, b.municipio, c.descricao as bairro_comunidade FROM se a left join municipios b on a.municipio = b.codigo left join bairros_comunidades c on a.bairro_comunidade = c.codigo where a.situacao in (${filtro}) ${filtroAcao} ${filtroTextoBusca} order by a.nome asc limit 100`)
      .then( retorno => {
          // alert(retorno.rows.length)
          const dados = []
          retorno.rows._array.forEach( c => {
              // results.push(c)
              // console.warn('NÃO TEM:')
              // console.warn(c)
              dados.push(c)
          })
          setlistaGeral(dados)
        //   console.warn(dados)
      })
  },[filtro, route, horario, filtroTextoBusca, filtroAcao])



    function renderOption({item}){
        return (
            <View
                style={{
                        width:'100%',
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"flex-start",
                        padding:16,
                        borderBottomColor:'#ccc',
                        borderBottomWidth:1,
                        borderBottomColor:'#ccc'
                        }}
            >
                <View style={{alignContent:'space-between', justifyContent:'left', flexDirection:'row'}}>
                    {(item.acao == '0')?(
                      <TouchableOpacity onPress={()=>{EnviarNuvem(item)}}><Icon name="arrow-up" style={{marginRight:20, fontSize:18, color:'green'}} /></TouchableOpacity>
                    ):(
                      <TouchableOpacity><Icon name="arrow-up" style={{marginRight:20, fontSize:18, color:'#eee'}} /></TouchableOpacity>
                    )}
                    
                    <TouchableOpacity style={{justifyContent:'left', flexDirection:'row'}} onPress={()=>{navigation.navigate("Form", { codigo:item.codigo, registro:item })}} >
                        <Icon name="edit" style={{fontSize:18}} />
                        <Text>{item.nome}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


  return (
    <SafeAreaView style={{flex:1}}>
      
      <View style={styles.container}>
        <View style={{width:'100%', marginBottom:10, flexDirection:'row', justifyContent:"space-between", alignItems:'center', paddingHorizontal:15}}>
        
        <TouchableOpacity 
                style={{
                        flexDirection:'row', 
                        alignItems:'center',
                        paddingHorizontal:10, 
                        paddingVertical:5,
                        marginEnd:10,
                        backgroundColor:'green',
                        borderRadius:8,
                        }}
                onPress={()=>setFiltroAcao(` and a.acao = '0'`)}
        >
            <Icon name="arrow-up" size={15} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
                style={{
                        flexDirection:'row', 
                        alignItems:'center',
                        paddingHorizontal:10, 
                        paddingVertical:5,
                        marginEnd:10,
                        backgroundColor:'#ccc',
                        borderRadius:8,
                        }}
                onPress={()=>setFiltroAcao(` and a.acao = '1'`)}                
        >
            <Icon name="arrow-up" size={15} color="#fff" />
        </TouchableOpacity>

        <TextInput 
                  style={{
                          flex:1, 
                          paddingHorizontal:8, 
                          backgroundColor:'#eee', 
                          borderTopLeftRadius:8, 
                          borderBottomLeftRadius:8,
                  }}
                  onChangeText={setTextoBusca}
                  defaultValue={textoBusca}
        />
        <TouchableOpacity 
                style={{
                        flexDirection:'row', 
                        alignItems:'center',
                        paddingHorizontal:10, 
                        paddingVertical:5,
                        backgroundColor:'blue',
                        borderTopEndRadius:8,
                        borderBottomEndRadius:8,
                        }}
                onPress={()=>executaBusca()}
                
        >
            <Icon name="search" size={15} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
                style={{
                        flexDirection:'row', 
                        alignItems:'center',
                        paddingHorizontal:10, 
                        paddingVertical:5,
                        backgroundColor:'red',
                        borderTopEndRadius:8,
                        borderRadius:8,
                        marginLeft:10,
                        }}
                onPress={()=>limparBusca()}
                
        >
            <Icon name="trash" size={15} color="#fff" />
        </TouchableOpacity>
        </View>
        <Text style={{color:'#333', fontWeight:'bold', paddingHorizontal:20, paddingBottom:10, width:'100%'}}>{titulo}</Text>
        <ScrollView style={{flex:1, width:'100%'}} >
            <FlatList
                style={{flex:1}}
                data={listaGeral}
                keyExtractor={(item) => String(item?.codigo)}
                renderItem={(item) => renderOption(item)}
            />
        </ScrollView>
        <StatusBar backgroundColor={'#ccc'} />
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', paddingHorizontal:30, paddingVertical:12}}>
            <TouchableOpacity onPress={()=>{OpcFiltro("'p', 'n', 'i', 'c'", 'g')}} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Icon name="user-cog" size={30} color="#333" />
                <Text style={{fontSize:10}}></Text>
                <Text style={{fontSize:10}}>Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{OpcFiltro("'p'",'p')}} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Icon name="user-clock" size={30} color="#333" />
                <Text style={{fontSize:10}}></Text>
                <Text style={{fontSize:10}}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{OpcFiltro("'i'",'i')}} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Icon name="user-edit" size={30} color="#333" />
                <Text style={{fontSize:10}}></Text>
                <Text style={{fontSize:10}}>Iniciadas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{OpcFiltro("'n'",'n')}} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Icon name="user-times" size={30} color="#333" />
                <Text style={{fontSize:10}}>Não</Text>
                <Text style={{fontSize:10}}>Encontradas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{OpcFiltro("'c'",'c')}} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Icon name="user-check" size={30} color="#333" />
                <Text style={{fontSize:10}}></Text>
                <Text style={{fontSize:10}}>Concluídos</Text>
            </TouchableOpacity>
            
            
        </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  campo:{
    backgroundColor: '#fff',
    padding:2,
    margin:2,
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#a1a1a1',
    borderWidth:1,
    borderColor:'#a1a1a1'
  },
  botaoEnviar:{
    backgroundColor: 'green',
    padding:5,
    width:'60%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
