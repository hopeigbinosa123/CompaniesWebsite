# views.py
from django.shortcuts import render
from .utils.email_sender import send_custom_email

def notify_student(request):
    if request.method == 'POST':
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        recipient = request.POST.get('recipient_email')

        send_custom_email(subject, message, recipient)

        return render(request, 'notification_success.html')

    return render(request, 'send_notification.html')

