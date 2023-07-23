import axios from 'axios';
import comandoSql from '../sql/comando';

export default axiusGet = () => {
    axios
      .get('http://project.mohatron.com/projectSocioEconomico/api/exportSql.php')
      .then(function (response) {
        // handle success
        // console.warn(JSON.stringify(response.data));
         response.data.map((o)=>{
            console.warn(o.comando)
            comandoSql(o.comando)

         })

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        // alert('Finally called');
      });
  };