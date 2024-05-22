from django.db import models
from .student_models import Student
from .models import EventRequest


class Subscription(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="subscriptions")
    event = models.ForeignKey(EventRequest, on_delete=models.CASCADE, related_name="subscriptions")

    class Meta:
        unique_together = (
            'student', 'event',
        )
