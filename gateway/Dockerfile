FROM node:alpine As development

WORKDIR /usr/src/app
COPY ["./tsconfig*.json", "./"]
COPY ["./common", "./common"]
COPY ["./gateway", "./gateway"]
WORKDIR /usr/src/app/common/rmq
RUN npm install
WORKDIR /usr/src/app/gateway
RUN npm install
RUN npm run build

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/gateway
COPY ./gateway/package*.json .
RUN npm install --omit=dev
COPY --from=development /usr/src/app/gateway/dist ./dist

EXPOSE 4000
CMD ["npm", "run ", "start:prod"]
