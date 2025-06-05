# Data Center Dispatch

**Data Center Dispatch** — это клиент-серверное приложение для мониторинга и управления серверами и виртуальными машинами в дата-центре. Интерфейс выполнен в уютном стиле домовёнка Кузи.

## Возможности

- Просмотр и мониторинг состояния серверов (нагрузка CPU, RAM, температура, аптайм, ОС, IP)
- Графики загрузки серверов
- Управление виртуальными машинами: запуск, остановка, создание, удаление
- Авторизация пользователя
- Уникальный дизайн с тематическими иллюстрациями

## Технологии

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL, psutil
- **Frontend:** React, Ant Design, Recharts, Vite
- **Docker** и **docker-compose** для контейнеризации

## Быстрый старт

### 1. Клонируйте репозиторий

```sh
git clone https://github.com/aliciayrvn/data-center-dispatch)
cd data-center-dispatch
```

### 2. Настройте переменные окружения

Создайте файл `.env` в папке `backend/` и укажите строку подключения к базе данных:

```
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/admin
```

### 3. Запустите проект через Docker Compose

```sh
docker-compose up --build
```

- Backend будет доступен на [http://localhost:8080](http://localhost:8080)
- Frontend — на [http://localhost:5173](http://localhost:5173)

### 4. Вход в систему

- Логин: `admin`
- Пароль: `1234`

## Структура проекта

- `backend/` — серверная часть (FastAPI)
- `frontend/` — клиентская часть (React)
- `docker-compose.yml` — оркестрация сервисов
- `README.md` — этот файл

## Скриншоты

![Главная страница](frontend/public/background.jpg)

## Лицензия

MIT License

---

> Сделано с заботой и уютом 🧸
