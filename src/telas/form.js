import react, {useState, useMemo, useEffect} from 'react'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Checkbox from '../componentes/form/checkbox';
import Select from '../componentes/form/select';
import FormImput from '../componentes/form/textinput';

import comandoSql from '../componentes/sql/comando';
import axiusGet from '../componentes/axios/get';

function enviarForm(data, codigo){
  const campos = []; 
  // const valores = []; 
  Object.keys(data).forEach((item) => {
    // console.log(item + " - " + data[item])
    campos.push(`${item} = '${data[item]}'`)
    // valores.push(`${data[item]}`)
  })
  campos.push(`acao = '0'`)

  const query = `UPDATE se SET ${campos.join(', ')} where codigo = ${codigo}`
  // console.log(codigo)
  comandoSql( query )
  .then( retorno => {
    // console.log('success')
    // console.log(retorno)
    
}, erro => {
  // console.log('erro')
  // console.log(erro)
})
  
}

// axiusGet();


const validacoes = yup.object({
  // nome1:yup.string().required("Informe seu nome"),
  // nome2:yup.string().required("Informe seu nome2"),
  // email:yup.string().email("E-mail inválido").required("Informe seu e-mail"),
  // senha:yup.string().min(6,"No minimo 6 digitos").required("Digite a senha")
})

export default function Form({route, navigation}) {

  const [listaGeral, setlistaGeral] = useState([]);
  const [editar, setEditar] = useState(route.params.registro);

  // console.log(editar[0].nome);

  useEffect(()=>{

      comandoSql( `SELECT codigo, nome FROM usuarios`)
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
          // console.warn(dados)
      })

      comandoSql( `SELECT a.*, b.municipio, c.descricao as bairro_comunidade FROM se a left join municipios b on a.municipio = b.codigo left join bairros_comunidades c on a.bairro_comunidade = c.codigo where a.codigo = ${route.params.codigo}`)
      .then( retorno => {
          // alert(retorno.rows.length)
          const dados = []
          retorno.rows._array.forEach( c => {
              // results.push(c)
              // console.warn('NÃO TEM:')
              // console.warn(c)
              dados.push(c)
          })
          setEditar(dados)
          // console.warn(dados)

      })
      
  },[])


function ExecutaAcoes(data){

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

  enviarForm(data, route.params.codigo);
  navigation.navigate('Beneficiados', {dataFormatada});
}

const [selectedId, setSelectedId] = useState();

const {control, handleSubmit, formState: { errors }, } = useForm({
  resolver:yupResolver(validacoes),
  defaultValues:{
    atende_necessidades:route.params.registro?.atende_necessidades,
    atende_necessidades_descricao:route.params.registro?.atende_necessidades_descricao,
    avaliacao_beneficios:route.params.registro?.avaliacao_beneficios,
    avaliacao_beneficios_descricao:route.params.registro?.avaliacao_beneficios_descricao,
    // bairro_comunidade:route.params.registro?.bairro_comunidade,
    beneficiario_encontrado:route.params.registro?.beneficiario_encontrado,
    beneficio_social:route.params.registro?.beneficio_social,
    beneficio_social_descricao:route.params.registro?.beneficio_social_descricao,
    cep:route.params.registro?.cep,
    condicoes_saude:route.params.registro?.condicoes_saude,
    cpf:route.params.registro?.cpf,
    curos_profissionais:route.params.registro?.curos_profissionais,
    curos_profissionais_descricao:route.params.registro?.curos_profissionais_descricao,
    data_nascimento:route.params.registro?.data_nascimento,
    email:route.params.registro?.email,
    endereco:route.params.registro?.endereco,
    estado_civil:route.params.registro?.estado_civil,
    genero:route.params.registro?.genero,
    grau_escolaridade:route.params.registro?.grau_escolaridade,
    // local:route.params.registro?.local,
    meio_transporte:route.params.registro?.meio_transporte,
    // municipio:route.params.registro?.municipio,
    necessita_documentos:route.params.registro?.necessita_documentos,
    nome:route.params.registro?.nome,
    opiniao_assistencia_social_descricao:route.params.registro?.opiniao_assistencia_social_descricao,
    opiniao_cidadania:route.params.registro?.opiniao_cidadania,
    opiniao_cidadania_descricao:route.params.registro?.opiniao_cidadania_descricao,
    opiniao_direitos_humanos:route.params.registro?.opiniao_direitos_humanos,
    opiniao_direitos_humanos_descricao:route.params.registro?.opiniao_direitos_humanos_descricao,
    opiniao_educacao:route.params.registro?.opiniao_educacao,
    opiniao_educacao_descricao:route.params.registro?.opiniao_educacao_descricao,
    opiniao_esporte_lazer:route.params.registro?.opiniao_esporte_lazer,
    opiniao_esporte_lazer_descricao:route.params.registro?.opiniao_esporte_lazer_descricao,
    opiniao_infraestrutura:route.params.registro?.opiniao_infraestrutura,
    opiniao_infraestrutura_descricao:route.params.registro?.opiniao_infraestrutura_descricao,
    opiniao_saude:route.params.registro?.opiniao_saude,
    opiniao_saude_descricao:route.params.registro?.opiniao_saude_descricao,
    opiniao_seguranca:route.params.registro?.opiniao_seguranca,
    opiniao_seguranca_descricao:route.params.registro?.opiniao_seguranca_descricao,
    ponto_referencia:route.params.registro?.ponto_referencia,
    quantidade_comodos:route.params.registro?.quantidade_comodos,
    recepcao_entrevistado:route.params.registro?.recepcao_entrevistado,
    redes_sociais:route.params.registro?.redes_sociais,
    renda_familiar:route.params.registro?.renda_familiar,
    renda_mensal:route.params.registro?.renda_mensal,
    rg:route.params.registro?.rg,
    rg_orgao:route.params.registro?.rg_orgao,
    servico_saude:route.params.registro?.servico_saude,
    telefone:route.params.registro?.telefone,
    tipo_imovel:route.params.registro?.tipo_imovel,
    tipo_moradia:route.params.registro?.tipo_moradia,
    vacina_covid:route.params.registro?.vacina_covid,
    situacao:route.params.registro?.situacao,
  }
})

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
      <View style={styles.container}>
        <Icon name="comments" size={30} color="#900" />
        <Text>Sistema de Cadastro</Text>


        <Controller
          control={control}
          name="situacao"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'p', nome:'Pendente'},
                {valor:'i', nome:'Iniciada'},
                {valor:'c', nome:'Concluída'},
                {valor:'n', nome:'Não encontrado'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.situacao}
              titulo="Informe a situação da Pesquisa"
              sequencia=""
            />
          )}
        />

        <Controller
          control={control}
          name="beneficiario_encontrado"
          render={({field:{onChange, defaultValue}})=>(
            <Checkbox
              sequencia="1"
              titulo="Beneficiado Encontrado?"
              opcoes={[
                        {valor: 'Sim', nome:"Sim"},
                        {valor: 'Não', nome:"Não"},
                      ]}
              defaultValue={route.params.registro?.beneficiario_encontrado}
              onChange={onChange} />
            )}
        />

        <Controller
          control={control}
          name="nome"
          render={({field:{onChange, onBlur, defaultValue, value}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              value={value}
              defaultValue={route.params.registro.nome}
              placeholder="Nome"
              titulo="Digite o nome completo"
              sequencia="2"              
            />
          )}
        />


        <Controller
          control={control}
          name="cpf"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro.cpf}
              placeholder="CPF"
              titulo="Informe o CPF"
              sequencia="3"
            />
          )}
        />


        <Controller
          control={control}
          name="rg"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.rg}
              placeholder="RG"
              titulo="Informe o RG"
              sequencia="4"
            />
          )}
        />


        <Controller
          control={control}
          name="rg_orgao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.rg_orgao}
              placeholder="Orgão RG"
              titulo="Informe o órgão de emissão do RG"
              sequencia="5"
            />
          )}
        />

        <Controller
          control={control}
          name="data_nascimento"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.data_nascimento}
              placeholder="Data de Nascimento"
              titulo="Informe a data de nascimento"
              sequencia="6"
            />
          )}
        />

        <Controller
          control={control}
          name="telefone"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.telefone}
              placeholder="Telefone para contato"
              titulo="Informe um telefone para contato"
              sequencia="7"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.email}
              placeholder="Digite seu e-mail"
              titulo="Informe o melhor e-mail"
              sequencia="8"
            />
          )}
        />

        {/* <Controller
          control={control}
          name="municipio"
          render={({field:{onChange, onBlur, defaultValue}})=>( */}
            <FormImput
              defaultValue={route.params.registro?.municipio}
              placeholder="Digite seu e-mail"
              titulo="Município"
              sequencia="9"
              disabled
            />
          {/* )}
        /> */}

        {/* <Controller
          control={control}
          name="bairro_comunidade"
          render={({field:{onChange, onBlur, defaultValue}})=>( */}
            <FormImput
              defaultValue={route.params.registro?.bairro_comunidade}
              placeholder="Bairro / Comunidade"
              titulo="Bairro / Comunidade"
              sequencia="10"
              disabled
            />
          {/* )}
        /> */}


        {/* <Controller
          control={control}
          name="local"
          render={({field:{onChange, onBlur, defaultValue}})=>( */}
            <FormImput
              defaultValue={route.params.registro?.local}
              placeholder="Bairro / Comunidade"
              titulo="Zona"
              sequencia="11"
              disabled
            />
          {/* )}
        /> */}


        <Controller
          control={control}
          name="endereco"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.endereco}
              placeholder="Endereço"
              titulo="Endereço"
              sequencia="12"
            />
          )}
        />

        <Controller
          control={control}
          name="cep"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.cep}
              placeholder="CEP"
              titulo="CEP"
              sequencia="13"
            />
          )}
        />

        <Controller
          control={control}
          name="ponto_referencia"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.ponto_referencia}
              placeholder="Ponto de Referência"
              titulo="Ponto de Referência"
              sequencia="14"
            />
          )}
        />

        <Controller
          control={control}
          name="genero"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Masculino', nome:'Masculino'},
                {valor:'Feminino', nome:'Feminino'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.genero}
              titulo="Sexo"
              sequencia="15"
            />
          )}
        />

        <Controller
          control={control}
          name="estado_civil"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Solteiro', nome:'Solteiro'},
                {valor:'Casado', nome:'Casado'},
                {valor:'Divorciado', nome:'Divorciado'},
                {valor:'Viúvo', nome:'Viúvo'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.estado_civil}
              titulo="Estado Civil"
              sequencia="16"
            />
          )}
        />

        <Controller
          control={control}
          name="redes_sociais"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'FaceBook', nome:'FaceBook'},
                {valor:'Twitter', nome:'Twitter'},
                {valor:'Instagram', nome:'Instagram'},
                {valor:'Youtube', nome:'Youtube'},
                {valor:'Linkedin', nome:'Linkedin'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.redes_sociais}
              titulo="Quais Redes Sociais você possui?"
              sequencia="17"
              multiplo
            />
          )}
        />


        <Controller
          control={control}
          name="meio_transporte"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'A Pé', nome:'A Pé'},
                {valor:'Bicicleta', nome:'Bicicleta'},
                {valor:'Moto', nome:'Moto'},
                {valor:'Ônibus', nome:'Ônibus'},
                {valor:'Carro próprio', nome:'Carro próprio'},
                {valor:'Fluvial', nome:'Fluvial'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.meio_transporte}
              titulo="Qual é o principal meio de transporte utilizado?"
              sequencia="18"
              multiplo
            />
          )}
        />

        <Controller
          control={control}
          name="tipo_imovel"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Própria', nome:'Própria'},
                {valor:'Emprestado/Cedido', nome:'Emprestado/Cedido'},
                {valor:'Financiado', nome:'Financiado'},
                {valor:'Invasão', nome:'Invasão'},
                {valor:'Alugado', nome:'Alugado'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.tipo_imovel}
              titulo="Você reside em Imóvel:"
              sequencia="19"
            />
          )}
        />

        <Controller
          control={control}
          name="tipo_moradia"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Madeira', nome:'Madeira'},
                {valor:'Alvenaria', nome:'Alvenaria'},
                {valor:'Palafita', nome:'Palafita'},
                {valor:'Flutuante', nome:'Flutuante'},
                {valor:'Apartamento', nome:'Apartamento'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              defaultValue={route.params.registro?.tipo_moradia}
              titulo="Tipo de Moradia:"
              sequencia="20"
            />
          )}
        />

        <Controller
          control={control}
          name="quantidade_comodos"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'1 Cômodo', nome:'1 Cômodo'},
                {valor:'2 Cômodos', nome:'2 Cômodos'},
                {valor:'3 Cômodos', nome:'3 Cômodos'},
                {valor:'4 Cômodos', nome:'4 Cômodos'},
                {valor:'Mais de 4 Cômodos', nome:'Mais de 4 Cômodos'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.quantidade_comodos}
              titulo="Quantos Cômodos possui sua residência?"
              sequencia="21"
            />
          )}
        />

        <Controller
          control={control}
          name="grau_escolaridade"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Alfabetizado', nome:'Não Alfabetizado'},
                {valor:'Ensino Fundamental I Completo', nome:'Ensino Fundamental I Completo'},
                {valor:'Ensino Fundamental II Completo', nome:'Ensino Fundamental II Completo'},
                {valor:'Ensino Médio Completo', nome:'Ensino Médio Completo'},
                {valor:'Ensino Técnico/Profissionalizante', nome:'Ensino Técnico/Profissionalizante'},
                {valor:'Ensino Superior Completo', nome:'Ensino Superior Completo'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.grau_escolaridade}
              titulo="Qual o seu Grau de escolaridade?"
              sequencia="22"
            />
          )}
        />

        <Controller
          control={control}
          name="curos_profissionais"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Sim', nome:'Sim'},
                {valor:'Não', nome:'Não'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.curos_profissionais}
              titulo="Você possui algum Curso Técnico/Profissionalizante?"
              sequencia="23"
            />
          )}
        />

        <Controller
          control={control}
          name="curos_profissionais_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.curos_profissionais_descricao}
              placeholder="Descreve os Cursos Técnico/Profissionalizante"
              titulo="Descreve os Cursos Técnico/Profissionalizante"
              sequencia="24"
            />
          )}
        />

        <Controller
          control={control}
          name="renda_mensal"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Nenhuma', nome:'Nenhuma'},
                {valor:'abaixo de um salário mínimo', nome:'abaixo de um salário mínimo'},
                {valor:'1 salário mínimo', nome:'1 salário mínimo'},
                {valor:'2 salários mínimos', nome:'2 salários mínimos'},
                {valor:'3 salários mínimos', nome:'3 salários mínimos'},
                {valor:'4 salários mínimos', nome:'4 salários mínimos'},
                {valor:'Acima de 4 Salários mínimos', nome:'Acima de 4 Salários mínimos'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.renda_mensal}
              titulo="Qual sua Renda Mensal?"
              sequencia="25"
            />
          )}
        />

        <Controller
          control={control}
          name="renda_familiar"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Nenhuma', nome:'Nenhuma'},
                {valor:'abaixo de um salário mínimo', nome:'abaixo de um salário mínimo'},
                {valor:'1 salário mínimo', nome:'1 salário mínimo'},
                {valor:'2 salários mínimos', nome:'2 salários mínimos'},
                {valor:'3 salários mínimos', nome:'3 salários mínimos'},
                {valor:'4 salários mínimos', nome:'4 salários mínimos'},
                {valor:'Acima de 4 Salários mínimos', nome:'Acima de 4 Salários mínimos'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.renda_familiar}
              titulo="Renda Familiar Mensal?"
              sequencia="26"
            />
          )}
        />

        <Controller
          control={control}
          name="beneficio_social"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Sim', nome:'Sim'},
                {valor:'Não', nome:'Não'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.beneficio_social}
              titulo="Você possui algum Benefício Social?"
              sequencia="27"
            />
          )}
        />

        <Controller
          control={control}
          name="beneficio_social_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.beneficio_social_descricao}
              placeholder="Descrição do Benefício Social"
              titulo="Descrição do Benefício Social"
              sequencia="28"
            />
          )}
        />


        <Controller
          control={control}
          name="servico_saude"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'SUS', nome:'SUS'},
                {valor:'Associações/PlanodeSaúde', nome:'Associações/PlanodeSaúde'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.servico_saude}
              titulo="Qual Serviço de Saúde você utiliza?"
              sequencia="29"
            />
          )}
        />

        <Controller
          control={control}
          name="condicoes_saude"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Doenças Crônicas', nome:'Doenças Crônicas'},
                {valor:'Tratamentos Médicos', nome:'Tratamentos Médicos'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.condicoes_saude}
              titulo="Condições de sua saúde?"
              sequencia="30"
            />
          )}
        />

        <Controller
          control={control}
          name="vacina_covid"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não', nome:'Não'},
                {valor:'1a Dose', nome:'1a Dose'},
                {valor:'2a Dose', nome:'2a Dose'},
                {valor:'3a Dose', nome:'3a Dose'},
                {valor:'4a Dose', nome:'4a Dose'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.vacina_covid}
              titulo="Já tomou a vacina contra o Covid-19? Quantas doses já tomou?"
              sequencia="31"
            />
          )}
        />

        <Controller
          control={control}
          name="necessita_documentos"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não', nome:'Não'},
                {valor:'RCN', nome:'RCN'},
                {valor:'RCC', nome:'RCC'},
                {valor:'RG', nome:'RG'},
                {valor:'CPF', nome:'CPF'},
                {valor:'CTPS', nome:'CTPS'},
                {valor:'TE', nome:'TE'},

              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.necessita_documentos}
              titulo="Necessita de Documentos"
              sequencia="32"
              multiplo
            />
          )}
        />

        <Controller
          control={control}
          name="avaliacao_beneficios"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Ótimo', nome:'Ótimo'},
                {valor:'Bom', nome:'Bom'},
                {valor:'Ruim', nome:'Ruim'},

              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.avaliacao_beneficios}
              titulo="Como você avalia o Beneficio?"
              sequencia="33"
            />
          )}
        />

        <Controller
          control={control}
          name="avaliacao_beneficios_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.avaliacao_beneficios_descricao}
              placeholder="Descrição de sua Avaliação do Benefício"
              titulo="Descrição de sua Avaliação do Benefício"
              sequencia="34"
            />
          )}
        />

        <Controller
          control={control}
          name="atende_necessidades"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Sim', nome:'Sim'},
                {valor:'Não', nome:'Não'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.atende_necessidades}
              titulo="O beneficio tem atendido suas Necessidades?"
              sequencia="35"
            />
          )}
        />

        <Controller
          control={control}
          name="atende_necessidades_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.atende_necessidades_descricao}
              placeholder="Descrição de sua Avaliação do Benefício"
              titulo="Descrição de Benefício que atende ou não as Necessidades"
              sequencia="36"
            />
          )}
        />

        <Text style={{padding:12}}>Na sua opinião dentro da estrutura do governo, em qual área abaixo descrita, necessita de melhorias para desenvolvimento na qualidade de vida da sua família e/ou da sua comunidade:</Text>

        <Controller
          control={control}
          name="opiniao_saude"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Acesso a Medicamentos', nome:'Acesso a Medicamentos'},
                {valor:'Marcação de Consultas', nome:'Marcação de Consultas'},
                {valor:'Realização de Exames', nome:'Realização de Exames'},
                {valor:'Realização de Procedimentos Médicos e/ou Cirurgia', nome:'Realização de Procedimentos Médicos e/ou Cirurgia'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_saude}
              titulo="Na Saúde?"
              sequencia="37"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_saude_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_saude_descricao}
              placeholder="Desreva suas Opiniões Falhas na Saúde"
              titulo="Desreva suas Opiniões Falhas na Saúde"
              sequencia="38"
            />
          )}
        />


        <Controller
          control={control}
          name="opiniao_educacao"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Sim Necessita', nome:'Sim Necessita'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_educacao}
              titulo="Na Educação?"
              sequencia="39"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_educacao_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_educacao_descricao}
              placeholder="Desreva suas Opiniões falhas na Educação"
              titulo="Desreva suas Opiniões falhas na Educação"
              sequencia="40"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_cidadania"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Sim Necessita', nome:'Sim Necessita'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_cidadania}
              titulo="Na Cidadania?"
              sequencia="41"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_cidadania_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_cidadania_descricao}
              placeholder="Desreva suas Opiniões falhas na Cidadania"
              titulo="Desreva suas Opiniões falhas na Cidadania"
              sequencia="42"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_infraestrutura"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Má Iluminação', nome:'Má Iluminação'},
                {valor:'Ausência de Asfalto e/ou Precariedade', nome:'Ausência de Asfalto e/ou Precariedade'},
                {valor:'Falta de Saneamento básico e/ou Melhoria', nome:'Falta de Saneamento básico e/ou Melhoria'},
                {valor:'Abastecimento de Água', nome:'Abastecimento de Água'},
                {valor:'Abastecimento de Energia', nome:'Abastecimento de Energia'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_infraestrutura}
              titulo="Na Infraestrutura?"
              sequencia="43"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_infraestrutura_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_infraestrutura_descricao}
              placeholder="Desreva suas Opiniões falhas na Infraestrutura"
              titulo="Desreva suas Opiniões falhas na Infraestrutura"
              sequencia="44"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_assistencia_social"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Alimentação Básica', nome:'Alimentação Básica'},
                {valor:'Auxílios Governamentais', nome:'Auxílios Governamentais'},
                {valor:'Assistência Psicológica', nome:'Assistência Psicológica'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_assistencia_social}
              titulo="Na Assistência Social?"
              sequencia="45"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_assistencia_social_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_assistencia_social_descricao}
              placeholder="Desreva suas Opiniões falhas na Assistência Social"
              titulo="Desreva suas Opiniões falhas na Assistência Social"
              sequencia="46"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_direitos_humanos"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Sim Necessita', nome:'Sim Necessita'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_direitos_humanos}
              titulo="Nos Direitos Humanos?"
              sequencia="47"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_direitos_humanos_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_direitos_humanos_descricao}
              placeholder="Desreva suas Opiniões falhas na Direitos Humanos"
              titulo="Desreva suas Opiniões falhas na Direitos Humanos"
              sequencia="48"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_seguranca"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Policiamento Ostensivo', nome:'Policiamento Ostensivo'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_seguranca}
              titulo="Na Segurança?"
              sequencia="49"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_seguranca_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_seguranca_descricao}
              placeholder="Desreva suas Opiniões falhas na Segurança"
              titulo="Desreva suas Opiniões falhas na Segurança"
              sequencia="50"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_esporte_lazer"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Não Necessita', nome:'Não Necessita'},
                {valor:'Areas para pratica de atividades esportivas', nome:'Areas para pratica de atividades esportivas'},
                {valor:'Outros', nome:'Outros'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.opiniao_esporte_lazer}
              titulo="'No Esporte e Lazer?"
              sequencia="51"
            />
          )}
        />

        <Controller
          control={control}
          name="opiniao_esporte_lazer_descricao"
          render={({field:{onChange, onBlur, defaultValue}})=>(
            <FormImput
              errors={errors}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={route.params.registro?.opiniao_esporte_lazer_descricao}
              placeholder="Outras Opiniões falhas no Esporte e Lazer"
              titulo="Outras Opiniões falhas no Esporte e Lazer"
              sequencia="52"
            />
          )}
        />

        <Text style={{fontWeight:"bold", padding:12}}>Avaliação do Técnico</Text>

        <Controller
          control={control}
          name="recepcao_entrevistado"
          render={({field:{onChange}})=>(
            <Checkbox
              opcoes={[
                {valor:'Ótimo', nome:'Ótimo'},
                {valor:'Bom', nome:'Bom'},
                {valor:'Ruim', nome:'Ruim'},
              ]}
              onChange={onChange}
              
              defaultValue={route.params.registro?.recepcao_entrevistado}
              titulo="Como fui Recebido?"
              sequencia=""
            />
          )}
        />

        
        <StatusBar backgroundColor={'#ccc'} />
        </View>
        </ScrollView>
        <View style={{width:'100%', backgroundColor:'#fff', padding:5, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
        <TouchableOpacity
          style={styles.botaoEnviar}
          onPress={(handleSubmit(ExecutaAcoes))}
        >
          <Text style={{color:'#fff', fontSize:20}}>Salvar Pesquisa</Text>
        </TouchableOpacity>
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
    paddingBottom:20,
    // borderColor:'red',
    // borderWidth:1,
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
    justifyContent: 'center',
    borderRadius:8,
  }
});
