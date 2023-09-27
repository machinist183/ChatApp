from django.urls import path 
from rest_framework.routers import DefaultRouter
from .views import UserViewSet , UserProfileViewset

router = DefaultRouter()
router.register('account' , UserViewSet, basename = 'account')
router.register('profile',UserProfileViewset ,basename = 'profile')

urlpatterns = router.urls