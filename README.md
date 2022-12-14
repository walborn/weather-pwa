# Weather Progressive Web App Example
## Запуск
0. Для начала нужен ключ, сгенерированный на сайте http://www.weatherapi.com/
И кладем его в файл `.env.local` (создаем его в корне, как `.env.local.example`)
```bash
WEATHER_API_KEY=<generated on http://www.weatherapi.com/>
```

1. Устанавливаем зависимости
```bash
> yarn
```

2. Запускаем локально
```bash
> yarn dev
```

### Деплой на Vercel
Необходимо прописать переменную из env.local

### Технологии
1. NextJS - выбрал из-за простой настройки и хорошей структуры. Страницы пока не использую, но для будущего мы захотим запоминать города, чтобы не искать их каждый раз - тогда и потребуется пейджинг. По еще прикрутить авторизацию

2. TypeScript - Типизация помогает при работе с внешним API. Типы генерим через http://json2ts.com/

3. Redux Toolkit - для удобной работы с API

4. Scss modules - удобно работать с модулями

5. Eslint - базовый линтинг

6. Stylelint - стили тоже нуждаются в линтинге, особенно порядок свойств

7. Service Worker - для кэширования и создания полноценного PWA (прогрессивного веб-приложения)




