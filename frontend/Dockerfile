# Node.jsの公式イメージ（バージョン18）をベースに使用
FROM node:18

# 作業ディレクトリを/appに設定
WORKDIR /app

# package.jsonとpackage-lock.json（存在すれば）をコピー
# 依存関係のインストールのため先にコピーすることでキャッシュを活用しやすくする
COPY package*.json ./

# 依存関係をインストール(キャッシュ無視してクリーンに入れる)
RUN npm install

# 残りのアプリケーションコードをすべてコピー
COPY . .

# ポート開放（Vite のデフォルト）
EXPOSE 5173

# 開発用サーバーを起動（npm run dev）
CMD ["npm", "run", "dev"]