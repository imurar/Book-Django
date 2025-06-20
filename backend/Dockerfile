# Pythonの軽量バージョン（提案：3.10 → 現状維持で3.11）
FROM python:3.11-slim

# 環境変数（提案にあったものを追加）
# .pycファイルを生成しない（キャッシュを抑える）
ENV PYTHONDONTWRITEBYTECODE=1
# ログ出力を即時反映（バッファリング無効）
ENV PYTHONUNBUFFERED=1

# 作業ディレクトリを指定
WORKDIR /app

# 依存関係のファイルをコピー
COPY requirements.txt /app/

# pipを最新にしつつ、依存をインストール
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . /app/

# Django開発サーバー起動（開発用）
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
