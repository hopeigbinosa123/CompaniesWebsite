from django.core.mail import send_mail
from django.conf import settings


def send_appointment_confirmation(appointment):
    subject = f"💇 Appointment Confirmation — {appointment.service}"
    
    # Get stylist name from the user relationship
    stylist_name = appointment.stylist.user.get_full_name() or appointment.stylist.user.username
    
    message = (
        f"Hi {appointment.client.first_name or appointment.client.username},\n\n"
        f"Your appointment with {stylist_name} is confirmed.\n"
        f"Details:\n"
        f"- Service: {appointment.service.name}\n"
        f"- Date: {appointment.appointment_date}\n"
        f"- Status: {appointment.get_status_display()}\n\n"
        "We look forward to seeing you!\n\n"
        "Best,\nThe OSIJ Team"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [appointment.client.email])