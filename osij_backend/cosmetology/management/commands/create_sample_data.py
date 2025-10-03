"""
Create sample services and stylists for the cosmetology app
"""

from django.core.management.base import BaseCommand
from cosmetology.models import BeautyService, StylistProfile
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create sample services and stylists for the cosmetology app'

    def handle(self, *args, **options):
        # Create sample services
        services_data = [
            {
                "name": "Haircut & Styling",
                "description": "Professional haircut and styling session",
                "price": 45.00,
                "duration_minutes": 60,
                "is_available": True,
            },
            {
                "name": "Hair Colouring",
                "description": "Full hair colouring service",
                "price": 85.00,
                "duration_minutes": 120,
                "is_available": True,
            },
            {
                "name": "Facial Treatment",
                "description": "Deep cleanse facial treatment",
                "price": 65.00,
                "duration_minutes": 90,
                "is_available": True,
            },
            {
                "name": "Makeup Application",
                "description": "Professional makeup application",
                "price": 55.00,
                "duration_minutes": 75,
                "is_available": True,
            },
            {
                "name": "Manicure & Pedicure",
                "description": "Complete nail care service",
                "price": 40.00,
                "duration_minutes": 90,
                "is_available": True,
            },
        ]

        # Clear existing services
        BeautyService.objects.all().delete()
        
        # Create services
        for service_data in services_data:
            BeautyService.objects.create(**service_data)
            self.stdout.write(self.style.SUCCESS(f'Created service: {service_data["name"]}'))

        # Create sample stylist if none exists
        if not StylistProfile.objects.exists():
            # Create a user for the stylist first
            user = User.objects.create_user(
                username='jane_stylist',
                email='jane@example.com',
                password='temp_password123',
                first_name='Jane',
                last_name='Smith'
            )
            
            stylist = StylistProfile.objects.create(
                user=user,
                specialization="Hair Styling & Colouring",
                experience=8,
                is_available=True
            )
            self.stdout.write(self.style.SUCCESS(f'Created stylist: {stylist.user.get_full_name()}'))

        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
