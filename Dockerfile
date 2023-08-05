from node:18.17.0
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]