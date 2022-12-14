import { MongoClient } from 'npm:mongodb';


export default function(user: string, pass: string) {
    const uri = `mongodb://${user}:${pass}@localhost:27017/app`
    console.log(uri);
    const client = new MongoClient(uri);
    return client;
}