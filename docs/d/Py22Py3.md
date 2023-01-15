# Миграция GAE Standard Python 2 на GAE Python 3

1. Удалить как можно больше неиспользуемого кода
    - Для этого можно использовать [vulture](../c/Python/Tools/Vulture.md)
2. Перевести код на Python 3
    - Используем futurize и six
3. Переводим webapp2 на flask