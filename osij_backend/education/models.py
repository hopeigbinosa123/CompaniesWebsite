import uuid
from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=100)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) # FIXME: Provide a valid default user id
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Lesson(models.Model):
    class LessonType(models.TextChoices):
        VIDEO = 'video', 'YouTube Video'
        LIVE = 'live', 'Live Zoom Session'
        TEXT = 'text', 'Text Content'
        QUIZ = 'quiz', 'Quiz'
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    lesson_type = models.CharField(max_length=20, choices=LessonType.choices)
    youtube_url = models.URLField(blank=True, null=True)
    zoom_meeting_id = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    duration_minutes = models.IntegerField(default=0)
    is_free = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"

class LiveSession(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='live_sessions')
    title = models.CharField(max_length=200)
    zoom_meeting_id = models.CharField(max_length=100, blank=True, null=True)
    zoom_meeting_url = models.URLField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    is_recurring = models.BooleanField(default=False)
    recording_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['start_time']
    
    def __str__(self):
        return f"Live: {self.title} - {self.start_time}"

class Enrollment(models.Model):
    class Status(models.TextChoices):
        ENROLLED = 'enrolled', 'Enrolled'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ENROLLED)
    progress = models.IntegerField(default=0)
    last_accessed = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'course']
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title}"

class LessonProgress(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    time_spent_minutes = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['enrollment', 'lesson']
    
    def __str__(self):
        status = "Completed" if self.completed else "In Progress"
        return f"{self.enrollment.user.username} - {self.lesson.title} ({status})"

class Certificate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) # FIXME: Provide a valid default user id
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    issued_at = models.DateTimeField(auto_now_add=True)
    certificate_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    download_link = models.URLField(blank=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        course_name = self.course.title if self.course else "No Course"
        return f"Certificate for {self.user.username} - {course_name}"
