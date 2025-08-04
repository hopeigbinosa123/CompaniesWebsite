from django.contrib import admin
from .models import Course, Enrollment, Certificate

# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'price', 'created_at')
    search_fields = ('title', 'description', 'instructor__username')
    list_filter = ['created_at']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'enrolled_at', 'paid', 'completed')
    search_fields = ('user__username', 'course__title')
    list_filter = ('enrolled_at', 'paid', 'completed')

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'download_link', 'issued_at')
    list_filter = ('issued_at',)