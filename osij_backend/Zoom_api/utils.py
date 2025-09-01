from education.models import Lesson

def get_lesson_by_id(lesson_id):
    try:
        return Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        return None
