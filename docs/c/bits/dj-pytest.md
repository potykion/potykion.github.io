---
tags:
  - testing
  - django
hide:
  - toc
---



# Как тестить Django с помощью pytest?

```python
@pytest.mark.django_db
def test_ok(client):
    resp: HttpResponse = client.post(
        '/api/...',
        {
            # json
        },
        content_type='application/json',
    )

    assert resp.status_code == 200
```