import db from "../sql/connect";

export default comandoSql = (query) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            query,
            [],
            //-----------------------
            (_, { rowsAffected, insertId, rows }) => {
            resolve({rowsAffected, insertId, rows})
            // if (rowsAffected > 0) resolve({rowsAffected, insertId, rows});
            // else reject("Error inserting query: " + JSON.stringify(query)); // insert falhou
            },
            (_, error) => reject('Erro de cadastro: '+error) // erro interno em tx.executeSql
        );
        });
    });
};
