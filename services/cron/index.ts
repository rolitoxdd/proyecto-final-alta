import * as dotenv from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

Deno.env.set("MONGO_USER",dotenv.config().MONGO_USER);
Deno.env.set("MONGO_PASS",dotenv.config().MONGO_PASS);
Deno.env.set("WEATHER_KEY",dotenv.config().WEATHER_KEY);

import getClient from "./lib/mongo.ts";
const client = getClient(Deno.env.get("MONGO_USER") as string, Deno.env.get("MONGO_PASS") as string);

// URL de la API a la que se quiere acceder
const apiUrl = "https://mindicador.cl/api/uf";
const apiUrl2 = "https://mindicador.cl/api/dolar";

// URL de la API que obtiene la temperatura de la ciudad de Santiago de Chile
const apiUrl3 = `https://api.openweathermap.org/data/2.5/weather?lat=70&lon=33&appid=${Deno.env.get('WEATHER_KEY')}`;

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
console.log(uf, dolar, weather);

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