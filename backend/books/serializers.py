from rest_framework import serializers
from .models import Book, Status

class StatusSerializer(serializers.ModelSerializer):
        class Meta:
                model = Status
                fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
        # 読み込み時はネストしたstatus情報を表示
        status = StatusSerializer(read_only=True)
        # 書き込み時はstatus_idでID指定可能にする
        status_id = serializers.PrimaryKeyRelatedField(
                queryset=Status.objects.all(), source='status', write_only=True
        )
        class Meta:
                model = Book
                fields = ['id', 'title', 'author', 'status', 'status_id']