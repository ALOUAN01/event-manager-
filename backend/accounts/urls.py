from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, testEndPoint, getRoutes
from .views import ProfileView
from .views import EventRequestView
from .student_views import StudentView
from .subscription_views import SubscriptionView
from .subscription_views import remove_student_from_class
from .subscription_views import SubscriptionDeleteAPIView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('subscription/', SubscriptionView.as_view()),
    path('subscription/<int:pk>/', SubscriptionView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', testEndPoint, name='test'),
    path('profiles/', ProfileView.as_view()),
    path("profile/<int:pk>/", ProfileView.as_view()),
    path("event/<int:pk>/", EventRequestView.as_view()),
    path("events/", EventRequestView.as_view()),
    path('students/', StudentView.as_view()),
    path("students/<int:pk>/", StudentView.as_view()),
    path('subscription/', SubscriptionView.as_view()),
    path('subscription/<int:pk>/', SubscriptionView.as_view()),
    path('subscription/<int:student_id>/<int:class_id>/', remove_student_from_class, name='remove_student_from_class'),
    path('api/student/<int:student_id>/class/<int:class_id>/delete/', SubscriptionDeleteAPIView.as_view(), name='subscription-delete'),
    path('', getRoutes)
]
