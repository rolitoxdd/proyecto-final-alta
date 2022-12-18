FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./alta.proto ./protos/alta.proto

RUN python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. ./protos/alta.proto

COPY main.py ./

CMD [ "python", "./main.py" ]