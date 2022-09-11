### Сборка проекта

**для разработки**\
docker-compose build\
docker-compose up

**продуктовая**\
docker-compose -f docker-compose.yml -f docker-compose.production.yml build\
docker-compose -f docker-compose.yml -f docker-compose.production.yml up

---

### Описание основных директорий проекта

**@database-scripts/**\
можно разместить файлы .sh/.sql которые будут запущены при первом старте контейнера mariadb

**@env_files/**\
содержит файлы с переменными окружения необходимыми для работы сервисов

**gateway/**\
шлюз для взаимодействия с системой

**api/**\
модуль для работы с данными системы

**common/**\
общая кодовая база для сервисов
