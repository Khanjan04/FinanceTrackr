from django.urls import path, include
from rest_framework.routers import DefaultRouter

from income import viewsets

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'income', viewsets.IncomeViewSet, basename='income')


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

