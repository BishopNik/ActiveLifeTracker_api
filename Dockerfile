FROM node

WORKDIR /app

COPY . /app/

RUN npm i

EXPOSE 4000

CMD [ "node", "server" ]