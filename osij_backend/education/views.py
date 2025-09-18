from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course, Lesson, Enrollment, LessonProgress, LiveSession
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer, LiveSessionSerializer
from rest_framework.generics import RetrieveAPIView
from .models import Course
from .serializers import CourseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Lesson
from .serializers import LessonSerializer
# views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Enrollment
from rest_framework.response import Response
# views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Enrollment
from .serializers import CourseSerializer

class MyEnrollmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
        courses = [en.course for en in enrollments]
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

class EnrollView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        course_id = request.data.get('course_id')
        Enrollment.objects.get_or_create(user=request.user, course_id=course_id)
        return Response({'status': 'enrolled'})

class CourseLessonsView(APIView):
    def get(self, request, pk):
        lessons = Lesson.objects.filter(course_id=pk)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        return {'request': self.request}

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'pk'

class CourseLessonsView(generics.ListAPIView):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Lesson.objects.filter(
            course_id=self.kwargs['pk'],
            is_active=True
        )

class EnrollmentView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MarkLessonCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, lesson_id):
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            enrollment = Enrollment.objects.get(user=request.user, course=lesson.course)
            
            progress, created = LessonProgress.objects.get_or_create(
                enrollment=enrollment,
                lesson=lesson,
                defaults={'completed': True, 'time_spent_minutes': request.data.get('time_spent', 0)}
            )
            
            if not created:
                progress.completed = True
                progress.time_spent_minutes = request.data.get('time_spent', progress.time_spent_minutes)
                progress.save()
            
            return Response({'status': 'success'})
        except (Lesson.DoesNotExist, Enrollment.DoesNotExist):
            return Response({'error': 'Not found'}, status=404)

class UpcomingLiveSessionsView(generics.ListAPIView):
    serializer_class = LiveSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        from django.utils import timezone
        return LiveSession.objects.filter(start_time__gte=timezone.now()).order_by('start_time')

class MyEnrollmentsView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)
