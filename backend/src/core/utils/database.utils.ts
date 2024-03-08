import mongoose from 'mongoose';
import { mongooseConfig } from './database-config';

export class DatabaseUtils {
    async healthCheck(){
        console.log("-------> Testando conexao com banco de dados...");
        const conn = await mongoose.createConnection(mongooseConfig.getUrl());
        conn.on("open", async()=> {
            const examples = await conn.db.admin().listDatabases()
            if(!!examples) console.log("-------> Conexão com banco de dados saudável.");
            else console.log("-------> Erro na conexão com banco de dados.");
        
            await conn.close()
            
          })
    }
}