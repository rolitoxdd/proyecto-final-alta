import {credentials} from "@grpc/grpc-js";
import getService from "./getService";
import express from "express";

const AltaService = getService({
  package: 'alta',
  service: 'Alta',
  path: './alta.proto',
});

const GRPC_SERVER = process.env.GRPC_SERVER || 'localhost';
const client = new AltaService(`${GRPC_SERVER}:50051`, credentials.createInsecure());

const app = express();

interface GetDolarResponse {
  dolar: number;
}

interface GetUFResponse {
  uf: number;
}

interface GetTemperatureResponse {
  temperature: number;
}

app.get('/dolar', (req, res) => {
  console.log('dolar')
  try {
    client.getDolar({ }, (err: Error, response: GetDolarResponse) => {
      if (err) {
        res.status(500).send
        return;
      }
      res.send(response);
    });
  } catch (e) {
    res.status(500).send
  }

});

app.get('/uf', (req, res) => {
  console.log('uf')
  try {
    // client.GetUF({ date: new Date().toISOString() }, (err: Error, response: GetUFResponse) => {
    client.GetUF({ }, (err: Error, response: GetUFResponse) => {
      if (err) {
        res.status(500).send
        return;
      }
      res.send(response);
    });
  } catch (e) {
    res.status(500).send
  }
});

app.get('/temperature', (req, res) => {
  console.log('temperature')
  try {
    // client.getTemperature({ city: 'Santiago' }, (err: Error, response: GetTemperatureResponse) => {
    client.getTemperature({ }, (err: Error, response: GetTemperatureResponse) => {
      if (err) {
        res.status(500).send
        return;
      }
      res.send(response);
    });
  } catch (e) {
    res.status(500).send
  }
});

app.get('/crossword', (req, res) => {
  res.json({crossword: 'https://isbooth.com/crucigramas'});
})



app.listen(80, () => {
  console.log('API listening on port 80');
})

// client.getDolar({date: '2022-03-01'}, console.log)
// client.getUf({date: '2022-03-01'}, console.log)
// client.getTemperature({city: 'Santiago'}, console.log)
// client.sayHello({name: 'World'}, console.log)