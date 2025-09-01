from rest_framework import serializers
from .models import Course, Lesson, Enrollment, LiveSession
from . import models as education_models


class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = "__all__"

    def get_is_completed(self, obj):
        request = self.context.get("request")
        if not (request and request.user.is_authenticated):
            return False

        # support either LessonProgress or LessonPlan model names (some projects use different names)
        LessonProgressModel = getattr(
            education_models, "LessonProgress", None
        ) or getattr(education_models, "LessonPlan", None)
        if LessonProgressModel is None:
            # no progress model available in models.py — cannot determine completion
            return False

        try:
            enrollment = Enrollment.objects.get(user=request.user, course=obj.course)
        except Enrollment.DoesNotExist:
            return False

        return LessonProgressModel.objects.filter(
            enrollment=enrollment, lesson=obj, completed=True
        ).exists()


class CourseSerializer(serializers.ModelSerializer):
    lessons_count = serializers.IntegerField(source="lessons.count", read_only=True)
    instructor_name = serializers.CharField(
        source="instructor.get_full_name", read_only=True
    )

    class Meta:
        model = Course
        fields = "__all__"


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Enrollment
        fields = "__all__"
        read_only_fields = ("user", "enrollment_date", "progress")


class LiveSessionSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source="lesson.title", read_only=True)
    course_title = serializers.CharField(source="lesson.course.title", read_only=True)

    class Meta:
        model = LiveSession
        fields = "__all__"

# serializers.py
from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'thumbnail', 'duration']
