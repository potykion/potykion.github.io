---
tags:
  - django
hide:
  - toc
---

# Как переопределить настройки Django в тестах?

```python
from django.test import TestCase


class TestSmth(TestCase):
    def test_ok(self):
        with self.settings(
            SETTING_TO_OVERRIDE='overriden',
        ):
            ...

```