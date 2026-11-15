FROM node:24-slim AS base

WORKDIR /app

# Kopiowanie plików definicji pakietów
COPY package.json package-lock.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty kodu aplikacji
COPY . .

# Port aplikacji
EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

# Etap deweloperski (domyślny)
FROM base AS dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# Etap budowy produkcyjnej
FROM base AS build
RUN npm run build

# Etap produkcyjny
FROM node:24-slim AS prod
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
