from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactMessageViewSet,
    submit_contact_form,
    get_contact_messages,
    mark_message_as_read,
    notify_student
)

router = DefaultRouter()
router.register(r'messages', ContactMessageViewSet, basename='contactmessage')

urlpatterns = [
    # Contact form endpoints
    path('contact/submit/', submit_contact_form, name='submit-contact-form'),
    path('contact/messages/', get_contact_messages, name='get-contact-messages'),
    path('contact/messages/<int:message_id>/mark-read/', mark_message_as_read, name='mark-message-read'),
    
    # Legacy endpoint
    path('notify/', notify_student, name='notify-student'),
    
    # ViewSet endpoints
    path('', include(router.urls)),
]
