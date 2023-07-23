import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("db.db")
export default db

let dataEnvio = new Date();
let dataFormatada = dataEnvio.getFullYear() +
                    "-" +
                    ((dataEnvio.getMonth() + 1)) +
                    "-" +
                    (dataEnvio.getDate())


db.transaction((tx) => {
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE restaurante;");
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    tx.executeSql("CREATE TABLE IF NOT EXISTS app (codigo INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT);");
    // tx.executeSql(`REPLACE INTO restaurante (codigo, restaurante, titulo, local) VALUES ('1','','','')`)

    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE usuarios;");
    // console.warn(`DELETE FROM usuarios WHERE data NOT LIKE '%${dataFormatada}%' AND upload = 's'`)
});
