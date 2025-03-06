#!/bin/bash
cd /app
echo "Instalando dependências..."
composer install

echo "Limpando cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

echo "Iniciando servidor..."
php artisan serve --host=0.0.0.0 --port=8000
