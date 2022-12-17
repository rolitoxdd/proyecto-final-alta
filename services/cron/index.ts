import getClient from "./lib/mongo.ts";



const uri = Deno.env.get("MONGO_URI") as string;

console.log(uri);

const client = getClient(uri);

// sleep 30 seconds


const apiUrl = "https://mindicador.cl/api/uf";
const apiUrl2 = "https://mindicador.cl/api/dolar";
const apiUrl3 = Deno.env.get('WEATHER_URI') as string;

async function getUf() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

async function getDolar() {
  const response = await fetch(apiUrl2);
  const data = await response.json();
  return data;
}

async function getWeather() {
    const response = await fetch(apiUrl3);
    const data = await response.json();
    return data;
}
const uf = await getUf();
const dolar = await getDolar();
const weather = await getWeather();
console.log(uf.serie[0].valor, dolar.serie[0].valor, weather.main.temp);

// meter uf, dolar y weather en mongo
await client.connect();
const db = client.db("app");
const collection = db.collection("data");


async function insertInfo() {
  const result = await collection.insertOne({
    uf: uf.serie[0].valor,
    dolar: dolar.serie[0].valor,
    weather: weather.main.temp,
    date: new Date()
  });
  client.close();
  console.log(result);
}
insertInfo();