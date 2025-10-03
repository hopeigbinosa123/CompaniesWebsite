from django.test import TestCase
from django.contrib.auth.models import User
from .models import Course, Enrollment


# Create your tests here.
class EducationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.course = Course.objects.create(
            title="Test Course",
            description="This is a test course.",
            price=99.99,
            instructor=self.user,
        )

    def test_enrollment_creation(self):
        enrollment = Enrollment.objects.create(
            user=self.user,
            course=self.course,
        )
        self.assertTrue(enrollment.enrolled_at)
        self.assertEqual(enrollment.paid)
