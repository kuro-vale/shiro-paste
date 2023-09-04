FROM node:18-alpine AS build

# Replace with your API
ENV API="http://localhost:3000"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN echo VITE_API=$API > .env
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine
EXPOSE 8080

RUN npm install -g http-server
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "http-server", "dist" ]