from rest_framework import serializers
from .models import ContactMessage, EmailNotification

 # serializes contact message objects into JSON
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'contact_type', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read']

 # serializes contact message objects into JSON
class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message', 'contact_type']

 # serializes email notification objects into JSON
class EmailNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailNotification
        fields = ['id', 'subject', 'message', 'recipient_email', 'sent_at']
        read_only_fields = ['id', 'sent_at']
