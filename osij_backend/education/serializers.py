from rest_framework import serializers
from .models import Course, Lesson, Enrollment, LiveSession
from django.conf import settings


class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = "__all__"

    def get_is_completed(self, obj):  # handles lesson completion status
        request = self.context.get("request")
        if not (request and request.user.is_authenticated):
            return False

        try:
            enrollment = Enrollment.objects.get(user=request.user, course=obj.course)
            return enrollment.lesson_progress.filter(
                lesson=obj, completed=True
            ).exists()
        except Enrollment.DoesNotExist:
            return False


class CourseSerializer(serializers.ModelSerializer):
    lessons_count = serializers.IntegerField(source="lessons.count", read_only=True)
    instructor_name = serializers.CharField(
        source="instructor.get_full_name", read_only=True
    )
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "price",
            "duration",
            "instructor",
            "instructor_name",
            "thumbnail",
            "thumbnail_url",
            "is_active",
            "created_at",
            "lessons_count",
        ]
        read_only_fields = ["instructor", "created_at"]

    def get_thumbnail_url(self, obj):  # handles thumbnail url
        if obj.thumbnail:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.thumbnail.url)
            return f"{settings.BASE_URL}{obj.thumbnail.url}"
        return None


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)
    course_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "user",
            "course",
            "course_title",
            "course_thumbnail",
            "enrolled_at",
            "status",
            "progress",
            "last_accessed",
        ]
        read_only_fields = ["user", "enrolled_at", "last_accessed"]

    def get_course_thumbnail(self, obj):  # handles course thumbnail
        if obj.course.thumbnail:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.course.thumbnail.url)
            return f"{settings.BASE_URL}{obj.course.thumbnail.url}"
        return None


class LiveSessionSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source="lesson.title", read_only=True)
    course_title = serializers.CharField(source="lesson.course.title", read_only=True)
    course_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = LiveSession
        fields = [
            "id",
            "course",
            "course_title",
            "course_thumbnail",
            "title",
            "zoom_meeting_id",
            "zoom_meeting_url",
            "start_time",
            "end_time",
            "duration_minutes",
            "is_recurring",
            "recording_url",
            "lesson",
            "lesson_title",
        ]

    def get_course_thumbnail(self, obj):
        if hasattr(obj, "course") and obj.course.thumbnail:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.course.thumbnail.url)
            return f"{settings.BASE_URL}{obj.course.thumbnail.url}"
        return None
