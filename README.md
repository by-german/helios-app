# Project Setup (Laravel + React)

Start the project

1. Build and start containers

~~~bash
docker-compose up -d --build
~~~

2. Stop containers
~~~bash
docker-compose down
~~~


## Backend (Laravel)

Access the backend container
~~~bash
docker-compose exec backend /bin/bash
~~~

Run migrations and seed data
~~~bash
php artisan migrate --seed
~~~

## Frontend (React)

Install dependencies
~~~bash
cd frontend
npm install
npm run dev
~~~