FROM node:alpine As development

WORKDIR /usr/src/app
COPY ["./tsconfig*.json", "./"]
COPY ["./common", "./common"]
COPY ["./api", "./api"]
WORKDIR /usr/src/app/common/rmq
RUN npm install
WORKDIR /usr/src/app/api
RUN npm install
RUN npm run build

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/api
COPY ./api/package*.json .
# нужно дополнительно скопировать папку со схемой и миграциями призмы в корень проекта
COPY ./api/prisma ./prisma
RUN npm install --omit=dev
COPY --from=development /usr/src/app/api/dist ./dist

CMD ["npm", "run ", "start:prod"]
