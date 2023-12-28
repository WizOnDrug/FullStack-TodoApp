from django.urls import path
from user.views import UserApiView, UserApiViewDetail
  
urlpatterns_users = [
    path('v1/users', UserApiView.as_view()), 
    path('v1/users/<int:id>', UserApiViewDetail.as_view()), 
]