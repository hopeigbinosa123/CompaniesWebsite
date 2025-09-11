# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import render
from .models import ContactMessage, EmailNotification
from .serializers import ContactMessageSerializer, ContactMessageCreateSerializer, EmailNotificationSerializer
from .utils.email_sender import send_custom_email


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ContactMessageCreateSerializer
        return ContactMessageSerializer
    
    def perform_create(self, serializer):
        contact_message = serializer.save()
        
        # Send email notification
        try:
            subject = f"New Contact Message: {contact_message.subject}"
            message = f"""
            New contact message received:
            
            From: {contact_message.name}
            Email: {contact_message.email}
            Type: {contact_message.get_contact_type_display()}
            
            Message:
            {contact_message.message}
            
            Received at: {contact_message.created_at}
            """
            
            # Send to admin email (you can configure this in settings)
            send_custom_email(subject, message, 'admin@yourcompany.com')
        except Exception as e:
            print(f"Error sending email notification: {e}")


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact_form(request):
    """
    Submit a contact form message
    """
    serializer = ContactMessageCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        contact_message = serializer.save()
        
        # Send email notification
        try:
            subject = f"New Contact Message: {contact_message.subject}"
            message = f"""
            New contact message received:
            
            From: {contact_message.name}
            Email: {contact_message.email}
            Type: {contact_message.get_contact_type_display()}
            
            Message:
            {contact_message.message}
            
            Received at: {contact_message.created_at}
            """
            
            # Send to admin email (you can configure this in settings)
            send_custom_email(subject, message, 'admin@osij.com')
        except Exception as e:
            print(f"Error sending email notification: {e}")
        
        return Response({
            'message': 'Contact message sent successfully',
            'id': contact_message.id
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_contact_messages(request):
    """
    Get all contact messages (admin only)
    """
    messages = ContactMessage.objects.all()
    serializer = ContactMessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_message_as_read(request, message_id):
    """
    Mark a contact message as read (admin only)
    """
    try:
        message = ContactMessage.objects.get(id=message_id)
        message.is_read = True
        message.save()
        return Response({'message': 'Message marked as read'})
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)


def notify_student(request):
    if request.method == 'POST':
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        recipient = request.POST.get('recipient_email')

        send_custom_email(subject, message, recipient)

        return render(request, 'notification_success.html')

    return render(request, 'send_notification.html')
