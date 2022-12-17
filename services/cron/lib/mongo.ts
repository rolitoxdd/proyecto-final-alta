import { MongoClient } from 'npm:mongodb';

export default function(uri: string) {
    const client = new MongoClient(uri);
    return client;
}