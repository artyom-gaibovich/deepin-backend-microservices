FROM node:20.18.0-alpine as development


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:deepin-backend-admin

FROM node:20.18.0-alpine as production
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}
USER node
WORKDIR /app

COPY --from=development /app/dist/apps/deepin-backend-admin ./
COPY --from=development /app/prisma ./prisma/

RUN npm install --only=production


CMD ["node", "main"]
