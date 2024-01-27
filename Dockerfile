FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src src

RUN npm ci && npm run build

########################################

FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist dist

EXPOSE 3000
ENTRYPOINT ["node","/app/dist/main"]