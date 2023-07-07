# DecorRetro

> A DecorRetro backend-frontend project.

## Features

- Nuxt ^2.8
- Laravel ^7
- SPA or SSR

## Installation

- `composer install`
- Edit `.env` to set your database connection details and
    - `CLIENT_URL` (local admin domain, ex: http://192.168.0.107:8041)
    - `APP_URL` (local admin domain for api, ex: http://192.168.0.107:8041/api)
    - `API_URL` (local admin domain for api, ex: http://192.168.0.107:8041/api)
    - `API_WEB_URL` (local site domain, ex: http://192.168.0.107:8000/api)
    - `API_IMG_URL` (local site domain with `/`, ex:http://192.168.0.107:8000/)

- (When installed via git clone or download, run `php artisan passport:install`)
- `php artisan migrate` or connect to main database
- `npm install`

- commands for start site on local:
    - `npm run dev` (command for nuxt)
    - `php artisan serve --host=192.168.0.107 --port=8041` (command for Laravel)
    
