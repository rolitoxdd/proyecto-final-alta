

import  {GrpcObject, loadPackageDefinition} from "npm:@grpc/grpc-js";
import {loadSync} from "npm:@grpc/proto-loader";
import { ServiceClientConstructor, ServiceDefinition } from 'npm:@grpc/grpc-js/build/src/make-client';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

export interface IServiceDetails {
  path: string;
  package: string;
  service: string;
}

const getService = (proto: IServiceDetails): ServiceDefinition => {
  const filename = proto.path;
  const packageDef = loadSync(filename, options);

  const grpcObj: GrpcObject = loadPackageDefinition(packageDef);

  const services = grpcObj[proto.package] as GrpcObject;

  const constructor = services[proto.service] as ServiceClientConstructor;

  const { service } = constructor;

  return service;
};

export default getService;