import getService from "./lib/getService.ts";

const greeterService = getService({
  package: 'helloworld',
  service: 'Greeter',
  path: './protos/helloworld.proto',
});
console.log(greeterService);