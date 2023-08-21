FROM node:18.16-alpine As development

WORKDIR /usr/app

COPY package*.json .
RUN npm ci

# Copy application files
COPY . .

# Generate Prisma, run migrations, and seed the database
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed

# Define the main container command
CMD ["npm", "run", "start:dev"]
