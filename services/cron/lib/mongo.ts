import { MongoClient } from 'npm:mongodb';
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const env = config();
const uri = Deno.env.get("MONGO_URI") as string;

console.log(uri);
export default function() {
    console.log(uri);
    const client = new MongoClient(uri);
    return client;
}