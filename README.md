# 📚 Book-Django（本棚アプリ）

Book-Django は、**Django + Django REST Framework（DRF）**と**Vue 3**による SPA 型の本棚管理アプリケーションです。  
Docker を使って開発環境を簡単に構築でき、データの永続化には PostgreSQL を採用しています。

---

## 📌 概要

このアプリは、書籍の登録・閲覧・削除・ステータス管理（未読／読書中／読了）など、シンプルな読書記録・管理機能を提供します。将来的にはメモ・お気に入り・ログイン認証などの機能拡張も予定しています。

---

## 🛠️ 使用技術

| カテゴリ           | 技術構成                                                |
| ------------------ | ------------------------------------------------------- |
| サーバーサイド     | Python 3.11 / Django 4.2.23 / DRF                       |
| クライアントサイド | Vue 3.5.13 / Vite / Axios                               |
| データベース       | PostgreSQL 15                                           |
| その他             | Docker / docker-compose / pgAdmin / django-cors-headers |

---

## 🧩 アプリ構成

### 🔹 Django（バックエンド）

- **Book モデル**：タイトル・著者・説明・ステータス（外部キー）
- **Status モデル**：未読／読書中／読了／気になる
- **ViewSet/API エンドポイント**：
  - `/api/books/` （BookViewSet）
  - `/api/statuses/` （StatusViewSet）
- **シリアライザー**：
  - BookSerializer
  - StatusSerializer
- **ルーティング**：`DefaultRouter`を利用（`urls.py`）

### 🔸 Vue（フロントエンド）

- **主な画面構成**
  - `BookList.vue`：書籍一覧
  - `BookDetail.vue`：詳細・ステータス変更
- **主要 API 操作（axios）**
  - 書籍一覧取得、登録、削除、更新
  - ステータス一覧取得
- **ルーティング例**
  ```js
  const routes = [
    { path: "/", name: "BookList", component: BookList },
    { path: "/create", name: "BookCreate", component: BookCreate },
    { path: "/:id", name: "BookDetail", component: BookDetail },
    // 今後追加予定
    { path: "/favorites", name: "Favorites", component: Favorites },
    { path: "/login", name: "Login", component: Login },
    { path: "/memo/:id", name: "Memo", component: Memo },
  ];
  ```

---

## 🚀 開発環境構築手順

### 1. `.env`ファイルの用意

リポジトリルートに`.env`ファイルを作成し、下記内容を記載してください（値は適宜変更）:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
```

> **注意**: `.env`は`.gitignore`に追加し、リポジトリには含めないでください。

---

### 2. Docker コンテナ起動

```bash
docker-compose up --build
```

- **API**: [http://localhost:8001/api/books/](http://localhost:8001/api/books/)
- **フロントエンド**: [http://localhost:5173](http://localhost:5173)
- **pgAdmin**: [http://localhost:5050](http://localhost:5050)

---

### 3. 初期セットアップ

```bash
# マイグレーション
docker-compose run web python manage.py makemigrations
docker-compose run web python manage.py migrate

# スーパーユーザー作成（任意）
docker-compose run web python manage.py createsuperuser
```

---

### 4. 必要パッケージ（backend/requirements.txt）

```txt
Django>=4.2,<5.0
psycopg2-binary
djangorestframework
django-cors-headers
```

---

## 🧪 API 利用例（抜粋）

```js
// 書籍一覧取得
export const getBooks = async () => {
  const response = await axios.get(`${API_BASE}/books/`);
  return response.data;
};

// 書籍登録
export const createBook = async (book) => {
  const response = await axios.post(`${API_BASE}/books/`, book);
  return response.data;
};

// 書籍削除
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BASE}/books/${id}/`);
  return response.data;
};

// 書籍情報を更新
export const updateBook = async (id, data) => {
  const response = await axios.patch(`${API_BASE}/books/${id}/`, data);
  return response.data;
};

// ステータス一覧取得
export const getStatuses = async () => {
  const response = await axios.get(`${API_BASE}/statuses/`);
  return response.data;
};
```

---

## 🧱 ディレクトリ構成（主要部分）

```
Book-Django/
├── backend/
│   ├── books/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── Django/
│   │   └── settings.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookList.vue
│   │   │   └── BookDetail.vue
│   │   └── api/books.js
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🧭 今後追加予定の機能

- ✍️ メモ機能（自由記述）
- 📌 フレーズ保存（お気に入りの一文）
- 🔐 ログイン・認証（JWT / Django Auth）
- 🔍 ISBN 自動登録
- ⭐️ お気に入りリスト

---

## 📎 補足

- PostgreSQL の管理は pgAdmin（[http://localhost:5050](http://localhost:5050)）から可能です。
- `.env`は**必ず**バージョン管理対象外にしてください。
- Docker 活用で、OS に依存せず誰でも同じ開発環境を再現可能です。

---

```

```
