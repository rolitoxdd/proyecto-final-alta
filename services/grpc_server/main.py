from concurrent import futures
import grpc
import pymongo
import protos.alta_pb2 as alta_pb2
import protos.alta_pb2_grpc as alta_pb2_grpc
from os import environ

myclient = pymongo.MongoClient(environ['MONGO_URI'])
mydb = myclient["app"]
mycol = mydb["data"]


class Alta(alta_pb2_grpc.Alta):
    def GetTemperature(self, request, context):
        print('[request]', request)
        temperature = mycol.find_one(
            sort=[('_id', pymongo.DESCENDING)])['weather']
        # TODO: get temperature from database
        return alta_pb2.GetTemperatureResponse(temperature=temperature)

    def GetUF(self, request, context):
        print('[request]', request)
        uf = mycol.find_one(
            sort=[('_id', pymongo.DESCENDING)])['uf']
        # TODO: get uf from database
        return alta_pb2.GetUFResponse(uf=uf)

    def GetDolar(self, request, context):
        print('[request]', request)
        dolar = mycol.find_one(
            sort=[('_id', pymongo.DESCENDING)])['dolar']
        # TODO: get dolar from database
        return alta_pb2.GetDolarResponse(dolar=dolar)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    alta_pb2_grpc.add_AltaServicer_to_server(Alta(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
