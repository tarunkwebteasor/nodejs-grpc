FROM node:16
WORKDIR /user
COPY  package.json .
RUN npm i
COPY . ./
ENV PORT=8081
EXPOSE ${PORT}
CMD [ "npm", "run", "dev"]