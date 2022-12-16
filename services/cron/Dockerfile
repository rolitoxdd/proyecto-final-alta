# Etapa de compilación
FROM denoland/deno as build
# Instalamos el compilador de TypeScript
RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

# Copiamos el código fuente de nuestra aplicación a un directorio de trabajo
WORKDIR /app
COPY . .

# Compilamos nuestro código TypeScript utilizando Deno
RUN deno cache index.ts
# Creamos un script para ejecutar nuestro código
RUN echo "deno run --allow-read --allow-write --allow-net index.ts" > main.js

# Etapa de ejecución
FROM denoland/deno:alpine

# Copiamos el código compilado de la etapa de compilación a un directorio de trabajo
WORKDIR /app
COPY --from=build /app/main.js .

# Instalamos el paquete cron para poder utilizar cron jobs
RUN apk add --no-cache dcron

# Creamos un trabajo cron para ejecutar nuestro script cada 2 minutos
RUN echo "*/2 * * * * /usr/local/bin/deno run --allow-read --allow-write --allow-net main.js" > /etc/crontabs/root

# Iniciamos el demonio cron
CMD ["crond", "-f"]