from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})
    email=serializers.EmailField(required=True)
    class Meta:
        model=User
        fields=['username','email','password']

    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email id already exists")
        
        return value

    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)

        return user