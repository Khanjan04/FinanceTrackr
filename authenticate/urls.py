
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from authenticate import viewsets
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'register', viewsets.RegisterView, basename='auth_register')

urlpatterns = [
    path('login/', viewsets.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls