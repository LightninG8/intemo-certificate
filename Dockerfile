# Указываем базовый образ Node.js 20.6 на базе Alpine
FROM node:20.6-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Устанавливаем необходимые пакеты для сборки
RUN apk update && \
    apk add --no-cache \
    build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Указываем команду для запуска приложения
CMD ["npm", "start"]

# Открываем порт, если приложение слушает определённый порт (например, 3000)
EXPOSE 3000
