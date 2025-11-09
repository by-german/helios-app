FROM php:8.2-cli

# Install system dependencies for laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Install php extensions
RUN docker-php-ext-install pdo pdo_mysql zip

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# /app instead of /var/www/html for simplicity (no server like nginx)
WORKDIR /app
COPY . .

# Install dependencies
RUN composer install

# Development port (only documentation)
EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
