# Lo iniciamos con la imagen oficial de Node 13
FROM node:14.3.0-alpine
# Vamos a crear un directorio donde dejar la aplicación
RUN mkdir -p /usr/back
# Nos cambiamos a ese directorio
WORKDIR /usr/back
# Copiamos el package json para gestionar las dependencias 
COPY bancadigital_front/package.json /usr/back
# Instalamos esas depndencias
RUN npm install
# Copiamos el código fuente de la aplicacion
COPY bancadigital_front/. /usr/back
# Exponemos el Puerto
EXPOSE 3200
# Arrancamos
CMD ["node","index.js"]
