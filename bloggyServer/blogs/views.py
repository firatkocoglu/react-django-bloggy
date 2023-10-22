from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# IMPORT MODELS
from .models import UserProfile, Category, Blog, Comment

# IMPORT SERIALIZERS
from .serializers import (
    UserProfileSerializer,
    CategorySerializer,
    BlogSerializer,
    CommentSerializer,
)


# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT USER
@api_view(["POST"])
@csrf_exempt
def login_view(request):
    # EXTRACT USERNAME AND PASSWORD FROM THE REQUEST
    username = request.data["username"]
    password = request.data["password"]

    # IF USER DOESN'T PROVIDE HIS/HER USERNAME OR PASSWORD
    if not username:
        return Response(
            {"detail": "Please provide a username."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not password:
        return Response(
            {"detail": "Please provide your password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # AUTHENTICATE USER WITH GIVEN CREDENTIALS
    user = authenticate(username=username, password=password)

    # IF USER CANNOT BE AUTHENTICATED
    if not user:
        return Response(
            {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)
    return Response({"detail": "Successfully logged in."}, status=status.HTTP_200_OK)


@api_view(["GET"])
@csrf_exempt
def logout_view(request):
    print(request.user)

    # IF UNAUTHENTICATED USERS REQUEST TO LOGOUT
    if not request.user.is_authenticated:
        return Response(
            {"detail": "Not authorized."}, status=status.HTTP_401_UNAUTHORIZED
        )

    logout(request)
    return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT


# CATEGORY OPERATIONS VIEWS


class CategoryViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        category_list = Category.objects.all()
        serialized_list = CategorySerializer(category_list, many=True)
        return Response(serialized_list.data, status=status.HTTP_200_OK)

    def create(self, request):
        if request.user.is_staff:
            new_category = request.data
            serialized_category = CategorySerializer(data=new_category)
            serialized_category.is_valid(raise_exception=True)
            serialized_category.save()
            return Response(serialized_category.data, status=status.HTTP_201_CREATED)

        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

    def update(self, request, pk):
        if request.user.is_staff:
            category = get_object_or_404(Category, id=pk)
            serialized_category = CategorySerializer(category, request.data)
            serialized_category.is_valid(raise_exception=True)
            self.perform_update(serialized_category)
            return Response(serialized_category.data, status=status.HTTP_200_OK)

        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, pk):
        if request.user.is_staff:
            category = get_object_or_404(Category, id=pk)
            self.perform_destroy(category)
            return Response(
                {"detail": "Category successfully deleted."}, status=status.HTTP_200_OK
            )

        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )


# CATEGORY OPERATIONS VIEWS


# BLOG OPERATIONS VIEWS

# BLOG OPERATIONS VIEWS


# COMMENT OPERATIONS VIEWS

# COMMENT OPERATIONS VIEWS
