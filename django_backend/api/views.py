from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import uuid

from .models import Topic, Product
from .serializers import TopicSerializer, ProductSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        topic_id = self.request.query_params.get('topic', None)
        if topic_id is not None:
            queryset = queryset.filter(topic_id=topic_id)
        return queryset

class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user is not None and user.is_staff:
            return Response({
                'success': True,
                'token': f"admin_token_{uuid.uuid4().hex}", # simple static mock token for stateless simplicity
                'username': user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Invalid administrator credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('image')
        if not file_obj:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save file to media folder with a unique name to prevent naming collisions
        ext = os.path.splitext(file_obj.name)[1]
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        file_path = os.path.join('images', unique_filename)
        
        saved_path = default_storage.save(file_path, ContentFile(file_obj.read()))
        
        # Generate absolute or relative URL
        # For full hosting independence, a relative media URL `/media/images/...` is excellent,
        # but returning absolute url like `https://ayush1273.pythonanywhere.com/media/images/...` is great for immediate display.
        # Let's return the absolute URL. We can construct it using the request object.
        request_url = request.build_absolute_uri('/')
        # Remove trailing slash
        if request_url.endswith('/'):
            request_url = request_url[:-1]
        
        public_url = f"{request_url}/media/{saved_path}"
        
        return Response({
            'success': True,
            'url': public_url
        }, status=status.HTTP_201_CREATED)
