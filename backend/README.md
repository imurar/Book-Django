# Django + PostgreSQL + Django REST Framework 環境構築ガイド

このリポジトリは、Docker Compose を使って

- Django（バックエンド）
- PostgreSQL（データベース）
- pgAdmin（DB 管理 GUI）
- Django REST Framework（API 構築）  
  をまとめて管理・構築できるテンプレートです。

---

## セットアップ手順

### 1. `.env`ファイルを作成

下記内容で`.env`ファイルをプロジェクト直下に配置してください。  
**このファイルにはパスワード等の機密情報が含まれるため、絶対にリポジトリには含めないでください。**

```env
POSTGRES_USER=任意のユーザー名
POSTGRES_PASSWORD=安全なパスワードをここに
POSTGRES_DB=任意のDB名
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=安全なパスワードをここに
```

> `.env`は.gitignore に必ず追加し、絶対にリポジトリに含めないでください。  
> ユーザー名や DB 名も、必要に応じて本番運用時は推測されにくい値に変更しましょう。

````

### 2. Docker環境を用意

`docker-compose.yml`には以下のようにサービスを定義します。

```yaml
version: "3.9"

services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file:
      - .env
    ports:
      - "5432:5432"

  pgadmin:
    image: dpage/pgadmin4
    env_file:
      - .env
    ports:
      - "5050:80"
    depends_on:
      - db

  web:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    env_file:
      - .env

volumes:
  postgres_data:
````

---

### 3. Django 用 Dockerfile（`backend/Dockerfile`）

```Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/
```

---

### 4. 必要パッケージを`backend/requirements.txt`に記載

```
Django>=4.2
psycopg2-binary
djangorestframework
django-cors-headers
```

---

### 5. Django プロジェクトとアプリ作成

```bash
docker-compose run web django-admin startproject backend .
docker-compose run web python manage.py startapp books
```

---

### 6. PostgreSQL/Django REST Framework 設定（`backend/settings.py`）

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
    }
}

INSTALLED_APPS += [
    'rest_framework',
    'corsheaders',
    'books',  # 作成したアプリ
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...既存ミドルウェア
]

CORS_ALLOW_ALL_ORIGINS = True  # 開発用（本番運用時は制限推奨）
```

---

### 7. モデル作成例（`books/models.py`）

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)

    def __str__(self):
        return self.title
```

---

### 8. シリアライザー（`books/serializers.py`）

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
```

---

### 9. ビューセット（`books/views.py`）

```python
from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

---

### 10. ルーティング設定

`books/urls.py`:

```python
from rest_framework.routers import DefaultRouter
from .views import BookViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

`backend/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),
]
```

---

### 11. マイグレーションと起動

```bash
docker-compose run web python manage.py makemigrations
docker-compose run web python manage.py migrate
docker-compose up
```

---

### 12. 動作確認

- [http://localhost:8000/api/books/](http://localhost:8000/api/books/) にアクセスし、DRF の管理 UI が表示されれば動作確認 OK です。
- pgAdmin は [http://localhost:5050](http://localhost:5050) で`.env`のメール・パスワードでログインできます。

---

## 今後追加予定の機能

- ログイン（認証、JWT 等）
- メモ機能
- ステータス管理
- お気に入り登録

---

## 注意・セキュリティ

- `.env`は**絶対に**リポジトリに含めず、パスワード等の機密情報は安全に管理してください。
- `CORS_ALLOW_ALL_ORIGINS = True`は開発用の設定です。本番運用時は必要なドメインのみ許可してください。
- 公開リポジトリでは常にパスワードや秘密鍵が含まれていないことを確認してください。

---
