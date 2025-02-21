from rest_framework import serializers
from .models import GeneratedContent

class PromptSerializer(serializers.Serializer):
    prompt = serializers.CharField()

class GeneratedContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedContent
        fields = ['id', 'prompt', 'response', 'created_at']
