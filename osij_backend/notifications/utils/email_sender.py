# utils/email_sender.py
from django.core.mail import send_mail
from django.conf import settings

def send_custom_email(subject, message, recipient_email):
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [recipient_email],
        fail_silently=False,
    )

def send_bulk_email(subject, message, recipient_list):
    for email in recipient_list:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

def send_welcome_email(user):
    subject = 'Welcome to OSIJ Platform!'
    message = f'Hi {user.username},'
    message += '\n\nThank you for registering on our platform. We are excited to have you!'
    recipient_email = user.email
    send_custom_email(subject, message, recipient_email)

def send_enrollment_confirmation_email(enrollment):
    subject = f'Enrollment Confirmation for {enrollment.course.title}'
    message = f'Hi {enrollment.user.username},\n\n'
    message += 'You can now access the course materials and start learning.\n\n'
    message += 'Thank you for choosing our platform!'
    recipient_email = enrollment.user.email
    send_custom_email(subject, message, recipient_email)