from rest_framework import status
from rest_framework.views import APIView 
from rest_framework.response import Response
from user.models import UserModel
from user.serializers import UserSerializer 

class UserApiView(APIView):
    def get(self, request):
        serializer = UserSerializer(UserModel.objects.all(), many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    def post(self, request): 
        #res = request.data.get('name')  
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)

class UserApiViewDetail(APIView):
    def get_object(self, pk):
        try:
            return UserModel.objects.get(pk=pk)
        except UserModel.DoesNotExist:
            return None
    def get(self, request, id):
        user = self.get_object(id)
        serializer = UserSerializer(user)  
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    def put(self, request, id):
        user = self.get_object(id)
        if(user==None):
            return Response(status=status.HTTP_200_OK, data={ 'error': 'Not found data'})
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        user = self.get_object(id)
        user.delete()
        response = { 'deleted': True }
        return Response(status=status.HTTP_204_NO_CONTENT, data=response)
