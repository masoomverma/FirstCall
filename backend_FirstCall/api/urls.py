from django.urls import path
from .views import predict, api_home, get_feature_names, get_items

urlpatterns = [
    # More specific paths first
    path('items/', get_items, name='items'),
    path('predict/', predict, name='predict'),
    path('features/', get_feature_names, name='features'),
    # Generic paths last
    path('', api_home, name='api-home'),
]
