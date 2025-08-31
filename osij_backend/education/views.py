from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course, Lesson, Enrollment, LessonProgress, LiveSession
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer, LiveSessionSerializer

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

class CourseLessonsView(generics.ListAPIView):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Lesson.objects.filter(course_id=course_id).order_by('order')

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