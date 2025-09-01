from django.contrib import admin
from .models import Course, Enrollment, Certificate, Lesson, LessonProgress, LiveSession

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'price', 'is_active', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ['is_active', 'created_at']

@admin.register(LiveSession)  # ADD THIS
class LiveSessionAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'start_time', 'end_time')
    list_filter = ['start_time', 'course']
    search_fields = ['title', 'course__title']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'status', 'progress', 'enrolled_at')
    list_filter = ['status', 'enrolled_at']
    search_fields = ['user__username', 'course__title']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'issued_at', 'verified')
    list_filter = ['issued_at', 'verified']
    search_fields = ['user__username', 'course__title']

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'lesson_type', 'order')
    list_filter = ['lesson_type', 'course']
    search_fields = ['title', 'course__title']

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'lesson', 'completed', 'time_spent_minutes')
    list_filter = ['completed']