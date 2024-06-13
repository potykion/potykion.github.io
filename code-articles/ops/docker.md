# Docker

## 30.05.2024 - 11.06.2024 - Docker hub перестал работать в России

Кто пользуется Docker Desktop и сегодня перестали скачиваться образы, нужно добавить гугловское зеркало в конфиг и
перезапустить весь Docker Desktop.

```
"registry-mirrors": [
"https://mirror.gcr.io"
]
```

На луниксах докер лечится также:

```
sudo nano /etc/docker/daemon.json
{
  // ...
    "registry-mirrors": [ "https://mirror.gcr.io"]
}
sudo systemctl restart docker
```

### https://huecker.io/ - Open-source прокси для Docker Hub

![huecker.svg](huecker.svg)