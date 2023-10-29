from django.shortcuts import get_object_or_404
from django.http import JsonResponse, response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.middleware import csrf

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

# IMPORT MODELS
from .models import Category, Blog, Comment, UserProfile

# IMPORT SERIALIZERS
from .serializers import (
    CategorySerializer,
    BlogSerializer,
    CommentSerializer,
    UserProfileSerializer,
)


# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT USER
@api_view(["POST"])
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
def logout_view(request):
    # IF UNAUTHENTICATED USERS REQUEST TO LOGOUT
    if not request.user.is_authenticated:
        return Response(
            {"detail": "Not authorized."}, status=status.HTTP_401_UNAUTHORIZED
        )

    logout(request)
    return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_user_view(request):
    if not request.user.is_authenticated:
        return Response(
            {"detail": "Not authorized"}, status=status.HTTP_401_UNAUTHORIZED
        )

    user = get_object_or_404(UserProfile, id=request.user.id)
    serialized_user = UserProfileSerializer(user)

    return Response(serialized_user.data, status=status.HTTP_200_OK)


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
class BlogViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk):
        blog = get_object_or_404(Blog, id=pk)
        serialized_blog = BlogSerializer(blog)
        return Response(serialized_blog.data, status=status.HTTP_200_OK)

    def list(self, request):
        blog_list = Blog.objects.all()
        serialized_blogs = BlogSerializer(blog_list, many=True)
        return Response(serialized_blogs.data, status=status.HTTP_200_OK)

    def create(self, request):
        blog_data = {"user_id": request.user.id, **request.data.dict()}
        serialized_blog = BlogSerializer(data=blog_data)
        serialized_blog.is_valid(raise_exception=True)
        serialized_blog.save()
        return Response(serialized_blog.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):
        blog = get_object_or_404(Blog, id=pk)
        if blog.user.id == request.user.id:
            serialized_blog = BlogSerializer(blog, request.data, partial=True)
            serialized_blog.is_valid(raise_exception=True)
            self.perform_update(serialized_blog)
            return Response(serialized_blog.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, pk):
        blog = get_object_or_404(Blog, id=pk)
        if blog.user.id == request.user.id:
            self.perform_destroy(blog)
            return Response(
                {"detail": "Blog successfully deleted."}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )


# BLOG OPERATIONS VIEWS


# COMMENT OPERATIONS VIEWS
class CommentViewSet(ModelViewSet):
    def retrieve(self, request, blog_pk, pk):
        comment = get_object_or_404(Comment, id=pk)
        serialized_comment = CommentSerializer(comment)
        return Response(serialized_comment.data, status=status.HTTP_200_OK)

    def list(self, request, blog_pk):
        comments = Comment.objects.filter(blog_id=blog_pk)
        serialized_comments = CommentSerializer(comments, many=True)
        return Response(serialized_comments.data, status=status.HTTP_200_OK)

    def create(self, request, blog_pk):
        comment_data = {
            "user_id": request.user.id,
            "blog_id": blog_pk,
            **request.data.dict(),
        }
        serialized_comment = CommentSerializer(data=comment_data)
        serialized_comment.is_valid(raise_exception=True)
        serialized_comment.save()
        return Response(serialized_comment.data, status=status.HTTP_201_CREATED)

    def update(self, request, blog_pk, pk):
        comment = get_object_or_404(Comment, id=pk)
        if comment.user.id == request.user.id:
            serialized_comment = CommentSerializer(comment, request.data, partial=True)
            serialized_comment.is_valid(raise_exception=True)
            self.perform_update(serialized_comment)
            return Response(serialized_comment.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "You do not have permissions to do this action"},
                status=status.HTTP_403_FORBIDDEN,
            )

    def destroy(self, request, blog_pk, pk):
        comment = get_object_or_404(Comment, id=pk)
        if comment.user.id == request.user.id:
            self.perform_destroy(comment)
            return Response(
                {"detail": "Comment successfully deleted."}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You do not have permissions to do this action"},
                status=status.HTTP_403_FORBIDDEN,
            )


# COMMENT OPERATIONS VIEWS
