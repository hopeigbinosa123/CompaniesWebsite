from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    ContactMessageViewSet,
    get_contact_messages,
    mark_message_as_read,
    notify_student,
    submit_contact_form,
    submit_software_service_request,
)

router = DefaultRouter()
router.register(r"messages", ContactMessageViewSet, basename="contactmessage")

urlpatterns = [
    # Contact form endpoints
    path("contact/submit/", submit_contact_form, name="submit-contact-form"),
    path("contact/messages/", get_contact_messages, name="get-contact-messages"),
    path(
        "contact/messages/<int:message_id>/mark-read/",
        mark_message_as_read,
        name="mark-message-read",
    ),
    # Software service request endpoint
    path(
        "software-service/submit/",
        submit_software_service_request,
        name="submit-software-service-request",
    ),
    # Legacy endpoint
    path("notify/", notify_student, name="notify-student"),
    # ViewSet endpoints
    path("", include(router.urls)),
]
