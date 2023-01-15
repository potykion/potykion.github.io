# Порно

![img.png](horse.png)

## Где смотреть и качать

### ВК

- Как качать: поставить
  расширение [VK Flex](https://chrome.google.com/webstore/detail/vk-flex/ljbmkjikheoaglnnifnghjbknejbmhap?hl=ru)
- Как искать: имя любой актрисы (или просто любое женское имя) + фильтры "Без ограничений", "Высокое качество", "По
  длительности > Длинные"
    - [Фильтры на примере Arwen Gold](https://vk.com/video?hd=1&len=2&notsafe=1&q=arwen%20gold)

### [Pornolab](http://pornolab.net/)

- Важно раздавать видосы, иначе качать не сможешь
- Большинство раздач оформлено => по ним можно найти оригинальную сцену => заскрепить ее для коллекции

## Зачем качать

- Видос могут удалить/заблочить
- **Создавать коллекцию** - в этом поможет Stash

## Stash

- https://stashapp.cc/ • https://github.com/stashapp/stash
- Очень вдохновила прога
- Много вкусных фич
- Мета информация о видосах: ссылка, рейтинг, счетчик дрочки
- Возможность ставить таймкоды
- Генерация видео-превью
- Теги, актрисы, студии
- Парс актрис/видосов из сторонних источников

### Как парсить

- Качаем [скреперы](https://github.com/stashapp/CommunityScrapers): склонить репо и папку scrapers закинуть в
  директорию со Stash
    - [Список скреперов](https://github.com/stashapp/CommunityScrapers/blob/master/SCRAPERS-LIST.md)
    - В списке выше описапы с каких сайтов можно спарсить инфу => на этих же сайтах надо искать сцены для парса
- Далее вводим ссылку на видос, и жмем кнопку скрепа
    - Пример ссылки: https://www.21sextury.com/en/video/assholefever/Anal-Stretching-Session/97175

#### О скреперах

- Настройки скреперов: `Settings > Metadata Providers`
- Запускать скреперы лучше под VPN
- Для Python-скреперов, прописываем путь к питону + ставим `requests`, `bs4`, `lxml`
- Если при парсе получаем 403, стоит попробовать прописать UserAgent в `Scraper User
  Agent`
    - `user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42`
- Если у скрепера тип `CDP`, то выставить путь к хрому чето не помагает(((
    - Возможно, сработает https://hub.docker.com/r/chromedp/headless-shell/

