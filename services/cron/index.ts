// import {cron, daily, monthly, weekly, start} from 'https://deno.land/x/deno_cron/cron.ts';
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import getClient from "./lib/mongo.ts";

const client = getClient();
const env = config();

// sleep 30 seconds
await new Promise(resolve => setTimeout(resolve, 20000));


const apiUrl = "https://mindicador.cl/api/uf";
const apiUrl2 = "https://mindicador.cl/api/dolar";
const apiUrl3 = env.WEATHER_URI

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