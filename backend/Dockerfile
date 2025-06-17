# Pythonの軽量バージョン
FROM python:3.11-slim

# 作業ディレクトリを/appに指定
WORKDIR /app

# 依存ファイルを先にコピーしてインストール
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 残りのファイルをコピー
COPY . .

# サーバー起動コマンド（開発用）
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
