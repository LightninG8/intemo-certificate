# Указываем базовый образ Node.js 20.6 на базе Alpine
FROM node:22.6

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Устанавливаем необходимые пакеты для сборки
RUN apt-get update && \
    apt-get install -y sudo build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    rm -rf /var/lib/apt/lists/*

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Копируем остальные файлы проекта
COPY index.js ./

# Устанавливаем зависимости проекта
RUN npm install


# Указываем команду для запуска приложения
CMD ["npm", "start"]

# Открываем порт, если приложение слушает определённый порт (например, 3000)
EXPOSE 3000
