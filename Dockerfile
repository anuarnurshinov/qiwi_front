# Install dependencies only when needed
FROM node:lts-alpine AS deps

WORKDIR .
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["node_modules/.bin/next", "start"]