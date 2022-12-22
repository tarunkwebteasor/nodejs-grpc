FROM node:16
WORKDIR /gateway
COPY  package.json .
RUN npm i
COPY . ./
ENV PORT=8080
EXPOSE ${PORT}
CMD [ "npm", "run", "dev"]