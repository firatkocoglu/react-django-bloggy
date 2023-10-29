from django.urls import path, include

from rest_framework_nested import routers

from .views import (
    login_view,
    logout_view,
    get_user_view,
    CategoryViewSet,
    BlogViewSet,
    CommentViewSet,
)

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"blogs", BlogViewSet, basename="blog")

blog_router = routers.NestedDefaultRouter(router, r"blogs", lookup="blog")
blog_router.register(r"comments", CommentViewSet, basename="blog-comments")

urlpatterns = [
    path("login/", login_view, name="login-view"),
    path("logout/", logout_view, name="logout-view"),
    path("getuser/", get_user_view, name="get-user-view"),
    path("", include(router.urls)),
    path("", include(blog_router.urls)),
]
