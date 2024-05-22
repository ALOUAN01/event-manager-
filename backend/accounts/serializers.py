from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .student_serializers import StudentShortSerializer
from .models import EventRequest


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventRequestSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()
    class Meta:
        model = EventRequest
        fields = ['id',
                  'title',
                  'image',
                  'description',
                  'organizer',
                  'committee',
                  'event_type',
                  'start_date',
                  'end_date',
                  'needs',
                  'status',
                  'students'
                  ]
    def get_students(self, instance):
        students = instance.get_students()
        serializer = StudentShortSerializer(students, many=True)
        return serializer.data
