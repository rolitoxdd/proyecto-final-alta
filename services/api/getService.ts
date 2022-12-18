import  {GrpcObject, loadPackageDefinition} from "@grpc/grpc-js";
import {loadSync} from "@grpc/proto-loader";
import { ServiceClientConstructor } from '@grpc/grpc-js/build/src/make-client';

export const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

export interface IServiceDetails {
  path: string;
  package?: string;
  service: string;
}

const getService = (proto: IServiceDetails): ServiceClientConstructor => {
  const filename = proto.path;
  const packageDef = loadSync(filename, options);

  const grpcObj: GrpcObject = loadPackageDefinition(packageDef);

  const services = grpcObj[proto?.package || ''] as GrpcObject;

  const constructor = (services ? services[proto.service] : grpcObj[proto.service] )as ServiceClientConstructor;

  return constructor
};

export default getService;