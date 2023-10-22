from django.urls import path, include

from rest_framework import routers

from .views import login_view, logout_view, CategoryViewSet

router = routers.DefaultRouter()
router.register(r"category", CategoryViewSet, basename="category")


urlpatterns = [
    path("login/", login_view, name="login-view"),
    path("logout/", logout_view, name="logout-view"),
    path("", include(router.urls)),
]
