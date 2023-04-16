# Install dependencies only when needed
FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
COPY --from=deps /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]
