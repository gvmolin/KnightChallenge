class MongooseConfig{
    getUrl(){
        return `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    }

    getName(){
        return process.env.DB_NAME;
    }
}

export const mongooseConfig = new MongooseConfig();