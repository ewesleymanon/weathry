FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN apk update && apk add --no-cache libc6-compat
# RUN corepack enable && corepack prepare pnpm@8.11.0 --activate 

RUN npm install

COPY . .

# RUN chown -R node /app/node_modules

# USER node

EXPOSE 3000

CMD ["npm", "start"]