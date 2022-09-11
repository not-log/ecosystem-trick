### Переменные окружения необходимые для работы проекта

---

#### Модуль gateway

**_допустимые файлы:_**

- .gateway.env - для запуска сервиса вне докера
- .gateway.docker.env - для запуска сервиса в докере

**_RABBITMQ_URL_**\
url адрес для подключения к rabbitmq\
Пример: RABBITMQ_URL="amqp://user:pass@localhost:5672"

**_TRUSTED_HOSTS_**\
список хостов (через точку с запятой), которые могут взаимодействовать с сервисом\
Пример: TRUSTED_HOSTS="localhost;127.0.0.1"

---

#### Модуль api

**_допустимые файлы:_**

- .api.env - для запуска сервиса вне докера
- .api.docker.env - для запуска сервиса в докере

**_DATABASE_URL_**\
url адрес для подключения к базе\
Пример: DATABASE_URL="mysql://user:pass@localhost:3306/db"

**_RABBITMQ_URL_**\
url адрес для подключения к rabbitmq\
Пример: RABBITMQ_URL="amqp://user:pass@localhost:5672"

---

#### Внешний сервис RabbitMQ

**_допустимые файлы:_**

- .rabbitmq.env

**_RABBITMQ_DEFAULT_USER_**\
пользователь rabbitmq\
Пример: RABBITMQ_DEFAULT_USER=user

**_RABBITMQ_DEFAULT_PASS_**\
пароль пользователя\
Пример: RABBITMQ_DEFAULT_PASS=pass
