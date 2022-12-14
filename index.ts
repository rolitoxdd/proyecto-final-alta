import getService from "./lib/getService.ts";

const greeterService = getService({
  package: 'helloworld',
  service: 'Greeter',
  path: './lib/protos/helloworld.proto',
});

console.log(greeterService);