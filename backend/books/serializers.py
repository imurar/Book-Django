from rest_framework import serializers
from .models import Book, Status

class StatusSerializer(serializers.ModelSerializer):
        class Meta:
                model = Status
                fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
        status = StatusSerializer(read_only=True)
        class Meta:
                model = Book
                fields = ['id', 'title', 'author', 'status']