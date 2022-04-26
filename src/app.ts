import express from 'express';
import sequelize from './Database'
import Config from './Config';
import cors from 'cors'
import Routers from './Routers';
const app = express();
app.use(cors({}));

app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json());
app.use('/api/v1',Routers);
app.listen(Config.keys.PORT,async()=>{
    // initialize db
    await sequelize.sync({alter:true,force:false})
    .then(data=>console.log('App running... '))
    .catch(err=>{
        console.log('Error ************: ',err?.message);
    
    });
});
