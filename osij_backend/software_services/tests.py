from django.test import TestCase
from django.contrib.auth.models import User
from .models import SoftwareEnquiry


# Create your tests here.
class SupportTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.enquiry = SoftwareEnquiry.objects.create(
            user=self.user,
            problem_title="Test Problem",
            problem_description="This is a test problem description.",
            platform="Web",
            preferred_contact_method="email",
        )
        self.assertEqual(enquiry.status, "open")
