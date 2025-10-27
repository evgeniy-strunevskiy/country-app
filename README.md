# Country App

Простое приложение на Angular для управления списком стран. Включает:
- Список стран с использованием Angular Material (таблица/стили)
- Создание/редактирование страны через реактивную форму
- Удаление с подтверждением через диалог
- Мок REST API на базе json-server (db.json)

Проект использует Angular 19, Angular Material и RxJS. Создан с помощью Angular CLI.

## Структура проекта

Основные каталоги и файлы:
- src/app/components
  - header: шапка приложения
  - country-list: список стран
  - country-form: добавление/редактирование страны
  - confirm-dialog: модальное окно подтверждения удаления
- src/app/models/country.ts: интерфейс/модель Country
- src/app/services/country.service.ts: сервис данных для CRUD-операций
- db.json: данные для мок-API (json-server)

## Требования
- Node.js LTS (рекомендуется v18+) и npm
- Angular CLI (используется локально через npm-скрипты)

## Установка и запуск
1. Установить зависимости:
   npm install

2. Запустить мок-API (json-server на http://localhost:3000):
   npm run start:api

3. В отдельном терминале запустить dev-сервер Angular (http://localhost:4200):
   npm start

Приложение будет автоматически перезагружаться при изменении исходников.

## Скрипты npm
- npm start — запуск dev-сервера (ng serve)
- npm run start:api — запуск json-server, раздача db.json на порту 3000
- npm run build — сборка продакшн-версии в dist/
- npm run watch — пересборка при изменениях с конфигурацией development
- npm test — запуск unit-тестов (Karma + Jasmine)

## Мок-API (json-server)
- Базовый URL: http://localhost:3000
- Файл данных: db.json
- Типовые эндпоинты:
  - GET    /countries
  - GET    /countries/:id
  - POST   /countries
  - PUT    /countries/:id
  - PATCH  /countries/:id
  - DELETE /countries/:id

Редактируйте db.json для начальных данных. json-server автоматически сохраняет изменения.

## Конфигурация и окружение
- Конфигурация Angular: angular.json
- Конфигурация TypeScript: tsconfig*.json
- Глобальные стили: src/styles.scss
- Точки входа: src/main.ts, src/index.html

## Особенности
- Формы: реактивные формы и валидация в country-form
- UI: компоненты/стили Angular Material
- Подтверждение: confirm-dialog перед разрушительными действиями
- Сервисы: country.service.ts инкапсулирует HTTP CRUD и RxJS-потоки

## Сборка
Создать оптимизированную продакшн-сборку:
  npm run build
Результат будет в dist/country-app/ и готов к деплою на статический хостинг.

## Устранение проблем
- Конфликты портов:
  - Если :4200 занят, запустите: ng serve --port 4300
  - Если :3000 занят, запустите json-server на другом порту:
      npx json-server --watch db.json --port 3001
- CORS/сетевые ошибки: убедитесь, что json-server запущен до использования приложения.
- Несовпадение версий Node/Angular CLI: переустановите зависимости:
      rm -rf node_modules package-lock.json && npm install
  В Windows PowerShell используйте:
      rmdir -Recurse -Force node_modules; del package-lock.json; npm install

## Технологии
- Angular 19, RxJS 7
- Angular Material & CDK
- json-server для мок-бэкенда