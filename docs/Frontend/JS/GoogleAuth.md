# Авторизация через Google

1. [Получаем client-id](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid): `643332836412-9o4lbidm9e1th1um834fhd9jd8hvbhun.apps.googleusercontent.com`
2. [Делаем кнопку](https://developers.google.com/identity/gsi/web/guides/display-button#javascript)
3. Все, в `handleCredentialResponse` прилетает jwt-токен, его [парсим](https://stackoverflow.com/a/38552302/5500609), и
   там будет вся инфа о юзере