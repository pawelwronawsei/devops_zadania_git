FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install || echo "Brak package.json"

COPY . .

RUN if [ -f package.json ] && grep -q "\"build\"" package.json; then npm run build; else echo "Brak build script – kopiuję pliki"; fi

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html || COPY --from=build /app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
