from rest_framework.routers import DefaultRouter
from .views import BookViewSet, StatusVieSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'statuses', StatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
