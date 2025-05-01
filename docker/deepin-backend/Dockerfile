FROM node:20.18.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:20.18.0-alpine as production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]
