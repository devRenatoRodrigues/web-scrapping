FROM  mcr.microsoft.com/playwright:v1.42.1-jammy

WORKDIR /app

COPY ./package*.json ./

# RUN apt-get update && apt-get install -y \
#     xvfb \
#     x11-utils \
#     x11vnc \
#     xfonts-100dpi \
#     xfonts-75dpi \
#     xfonts-scalable \
#     xfonts-cyrillic \
#     fluxbox \
#     openbox \
#     && rm -rf /var/lib/apt/lists/*

RUN npm install

RUN npm install -g prisma

COPY . .

EXPOSE 3000


# CMD [ "xvfb-run","npm", "run", "dev"]
CMD [,"npm", "run", "dev"]
