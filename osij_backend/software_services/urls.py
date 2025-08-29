from django.urls import path
from .views import EnquiryList, ResponseList

urlpatterns = [
    path('enquiries/', EnquiryList.as_view()),
    path('responses/', ResponseList.as_view()),
]
