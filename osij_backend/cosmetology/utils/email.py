from django.core.mail import send_mail
from django.conf import settings


def send_appointment_confirmation(appointment):
    subject = f"💇 Appointment Confirmation — {appointment.service}"
    message = (
        f"Hi {appointment.client.first_name},\n\n"
        f"Your appointment with {appointment.stylist.name} is confirmed.\n"
        f"Details:\n"
        f"- Service: {appointment.service}\n"
        f"- Date & Time: {appointment.start_time.strftime('%Y-%m-%d %H:%M')}\n"
        f"- Status: {appointment.status}\n\n"
        "We look forward to seeing you!\n\n"
        "Best,\nThe OSIJ Team"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [appointment.client.email])
