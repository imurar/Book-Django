from django.db import models

class Status(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    status = models.ForeignKey(Status, null=True, blank=True, on_delete=models.CASCADE, related_name='books')

    def __str__(self):
        return f"{self.title} ({self.status})"
