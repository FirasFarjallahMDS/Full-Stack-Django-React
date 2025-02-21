from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, register_user,get_user_generated_content, get_user_info,generate_content

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register_user'),
    path('user/', get_user_info, name='user_info'),
     path('generate/', generate_content, name='generate_content'),
    path('history/', get_user_generated_content, name='user_content_history'),

]

