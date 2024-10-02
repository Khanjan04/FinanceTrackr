from django.urls import path, include
from rest_framework.routers import DefaultRouter

from bank import viewsets

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'bank-account', viewsets.BankAccountViewSet, basename='bank-account')
router.register(r'bank-account-transaction', viewsets.BankAccountTransactionViewSet, basename='bank-account-transaction')


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

