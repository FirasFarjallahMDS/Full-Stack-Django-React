from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework import status
from django.conf import settings
from .serializers import PromptSerializer,GeneratedContentSerializer
from .models import GeneratedContent
import openai

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        print("Login Attempt Data:", request.data)  # Debugging print
        response = super().post(request, *args, **kwargs)
        if response.status_code != 200:
            print("Login Failed:", response.data)  # Print error details
        return response



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """Return logged-in user's info"""
    return Response({
        "username": request.user.username,
    })
@api_view(['POST'])
def register_user(request):
    """Register a new user"""
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)




openai.api_key = settings.OPENAI_API_KEY  # Set API Key

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_content(request):
    """Generate AI-powered text and save it to the database for the user"""
    serializer = PromptSerializer(data=request.data)

    if serializer.is_valid():
        prompt = serializer.validated_data['prompt']

        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",  # Ensure this model is valid
                messages=[{"role": "user", "content": prompt}],
                max_tokens=100
            )

            if 'choices' not in response or not response['choices']:
                print("Error: No choices returned from OpenAI API")
                return Response({"error": "OpenAI API returned no response"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            generated_text = response['choices'][0]['message']['content'].strip()

            # Save to database
            generated_content = GeneratedContent.objects.create(
                user=request.user,
                prompt=prompt,
                response=generated_text
            )

            return Response({"generated_text": generated_text}, status=status.HTTP_200_OK)

        except openai.error.OpenAIError as e:
            print(f"OpenAI API Error: {e}")  # Debugging print
            return Response({"error": "OpenAI API error, check API key."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(f"Unexpected Error: {e}")  # Debugging print
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_generated_content(request):
    """Fetch all saved content for the authenticated user"""
    contents = GeneratedContent.objects.filter(user=request.user).order_by('-created_at')
    serializer = GeneratedContentSerializer(contents, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)