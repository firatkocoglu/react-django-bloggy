from rest_framework import serializers
from .models import UserProfile, Category, Blog, Comment


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "bio",
            "location",
            "avatar",
            "first_name",
            "last_name",
            "email",
            "username",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category"]


class CommentSerializer(serializers.ModelSerializer):
    blog_id = serializers.IntegerField(write_only=True)

    user = UserProfileSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Comment
        fields = ["id", "blog_id", "user_id", "user", "comment", "date"]


class BlogSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)

    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "user_id",
            "user",
            "category_id",
            "category",
            "title",
            "content",
            "date",
        ]
