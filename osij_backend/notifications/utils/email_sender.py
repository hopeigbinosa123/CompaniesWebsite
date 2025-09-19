# utils/email_sender.py
import logging
from django.core.mail import send_mail
from django.conf import settings

# Set up a logger for this module
logger = logging.getLogger(__name__)


def send_custom_email(subject, message, recipient_email):
    """
    Sends a single custom email.
    """
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [recipient_email],
            fail_silently=False,
        )
        logger.info(
            f"Successfully sent email to {recipient_email} with subject: {subject}"
        )
    except Exception as e:
        logger.error(
            f"Failed to send email to {recipient_email}. Error: {e}", exc_info=True
        )


def send_bulk_email(subject, message, recipient_list):
    """
    Sends an email to a list of recipients in a single batch.
    """
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            fail_silently=False,
        )
        logger.info(
            f"Successfully sent bulk email with subject: {subject} to {len(recipient_list)} recipients."
        )
    except Exception as e:
        logger.error(f"Failed to send bulk email. Error: {e}", exc_info=True)


def send_welcome_email(user):
    """
    Sends a welcome email to a new user.
    """
    subject = "Welcome to OSIJ Platform!"

    message = f"""
    Hi {user.username},

    Thank you for registering on our platform. We are excited to have you!
    """

    message = f"Hi {user.username},"
    message += (
        "\n\nThank you for registering on our platform. We are excited to have you!"
    )

    recipient_email = user.email
    send_custom_email(subject, message, recipient_email)


def send_enrollment_confirmation_email(enrollment):
    """
    Sends an enrollment confirmation email.
    """
    subject = f"Enrollment Confirmation for {enrollment.course.title}"

    message = f"""
    Hi {enrollment.user.username},

    This email confirms your enrollment in the course: "{enrollment.course.title}".
    You can now access the course materials and start learning.

    Thank you for choosing our platform!
    """

    message = f"Hi {enrollment.user.username},\n\n"
    message += "You can now access the course materials and start learning.\n\n"
    message += "Thank you for choosing our platform!"

    recipient_email = enrollment.user.email
    send_custom_email(subject, message, recipient_email)
