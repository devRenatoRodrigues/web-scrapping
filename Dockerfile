FROM  mcr.microsoft.com/playwright:v1.42.1-jammy

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm install -g prisma


COPY . .

RUN prisma generate --schema=./src/prisma/schema.prisma
# RUN prisma migrate dev --name init --schema=./src/prisma/schema.prisma
# RUN npx -y playwright@1.43.0 install --with-deps
RUN npm i chromium

EXPOSE 3000


CMD ["npm", "run", "dev"]