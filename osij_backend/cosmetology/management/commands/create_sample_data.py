from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from cosmetology.models import BeautyService, StylistProfile, AppointmentBooking

User = get_user_model()


class Command(BaseCommand):
    help = "Create sample cosmetology data for testing"

    def handle(self, *args, **kwargs):
        # Create sample services
        services_data = [
            {
                "name": "Haircut & Styling",
                "description": "Professional haircut and styling session",
                "category": "hair",
                "price": 45.00,
                "duration": 60,
            },
            {
                "name": "Hair Coloring",
                "description": "Full hair coloring service",
                "category": "hair",
                "price": 85.00,
                "duration": 120,
            },
            {
                "name": "Facial Treatment",
                "description": "Deep cleansing facial treatment",
                "category": "skin",
                "price": 65.00,
                "duration": 90,
            },
            {
                "name": "Makeup Application",
                "description": "Professional makeup application",
                "category": "makeup",
                "price": 55.00,
                "duration": 75,
            },
            {
                "name": "Manicure & Pedicure",
                "description": "Complete nail care service",
                "category": "nails",
                "price": 40.00,
                "duration": 90,
            },
        ]

        # Create sample stylists
        stylists_data = [
            {
                "username": "sarah_stylist",
                "email": "sarah@example.com",
                "first_name": "Sarah",
                "last_name": "Johnson",
                "bio": "Professional hairstylist with 8 years of experience in modern cuts and coloring techniques.",
                "specialization": "Hair Styling & Coloring",
                "experience": 8,
            },
            {
                "username": "mike_stylist",
                "email": "mike@example.com",
                "first_name": "Mike",
                "last_name": "Chen",
                "bio": "Skincare specialist focused on facial treatments and skin rejuvenation.",
                "specialization": "Skincare & Facials",
                "experience": 6,
            },
            {
                "username": "emma_stylist",
                "email": "emma@example.com",
                "first_name": "Emma",
                "last_name": "Davis",
                "bio": "Professional makeup artist with expertise in bridal and special event makeup.",
                "specialization": "Makeup Artistry",
                "experience": 5,
            },
        ]

        # Create services
        created_services = []
        for service_data in services_data:
            service, created = BeautyService.objects.get_or_create(
                name=service_data["name"], defaults=service_data
            )
            created_services.append(service)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Created service: {service.name}")
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f"Service already exists: {service.name}")
                )

        # Create stylists
        created_stylists = []
        for stylist_data in stylists_data:
            user, user_created = User.objects.get_or_create(
                username=stylist_data["username"],
                defaults={
                    "email": stylist_data["email"],
                    "first_name": stylist_data["first_name"],
                    "last_name": stylist_data["last_name"],
                },
            )

            if user_created:
                user.set_password("password123")
                user.save()

            stylist, stylist_created = StylistProfile.objects.get_or_create(
                user=user,
                defaults={
                    "bio": stylist_data["bio"],
                    "specialization": stylist_data["specialization"],
                    "experience": stylist_data["experience"],
                },
            )
            created_stylists.append(stylist)

            if stylist_created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created stylist: {stylist.user.get_full_name()}"
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Stylist already exists: {stylist.user.get_full_name()}"
                    )
                )

        self.stdout.write(self.style.SUCCESS("\nSample data creation completed!"))
        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(created_services)} services and {len(created_stylists)} stylists"
            )
        )
