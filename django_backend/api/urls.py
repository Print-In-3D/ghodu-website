from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet, ProductViewSet, AdminLoginView, ImageUploadView

router = DefaultRouter()
router.register(r'topics', TopicViewSet, basename='topic')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin_login'),
    path('upload/', ImageUploadView.as_view(), name='image_upload'),
    path('', include(router.urls)),
]
