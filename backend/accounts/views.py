from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import EventRequest
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, EventRequestSerializer
from .serializers import UserSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = {request.user.id}
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class EventRequestView(APIView):
    def get_EventRequest(self, pk):
        try:
            event = EventRequest.objects.get(id=pk)
            return event
        except:
            return JsonResponse("EventRequest Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_EventRequest(pk)
            serializer = EventRequestSerializer(data)
        else:
            data = EventRequest.objects.all()
            serializer = EventRequestSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = EventRequestSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("EventRequest Created Successfully", safe=False)
        return JsonResponse("Failed to Add EventRequest", safe=False)

    def put(self, request, pk=None):
        EventRequest_to_update = EventRequest.objects.get(id=pk)
        serializer = EventRequestSerializer(instance=EventRequest_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("EventRequest Updated Successfully", safe=False)
        return JsonResponse("Failed to Update EventRequest")

    def delete(self, request, pk=None):
        EventRequest_to_delete = EventRequest.objects.get(id=pk)
        EventRequest_to_delete.delete()
        return JsonResponse("EventRequest Deleted Successfully", safe=False)





from django.http.response import JsonResponse

from django.http.response import Http404
from rest_framework.response import Response
class ProfileView(APIView):
    def get_Profile(self, pk):
        try:
            profile = User.objects.get(id=pk)
            return profile
        except:
            return JsonResponse("Profile Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_Profile(pk)
            serializer = UserSerializer(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Profile Created Successfully", safe=False)
        return JsonResponse("Failed to Add Profile", safe=False)

    def put(self, request, pk=None):
        profile_to_update = User.objects.get(id=pk)
        serializer = UserSerializer(instance=profile_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Profile Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Profile")

    def delete(self, request, pk=None):
        profile_to_delete = User.objects.get(id=pk)
        profile_to_delete.delete()
        return JsonResponse("Profile Deleted Successfully", safe=False)











