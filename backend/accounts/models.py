from django.contrib.auth.models import User

from django.db import models
from .student_models import Student


class EventRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En cours de traitement'),
        ('accepted', 'Accepté'),
        ('rejected', 'Rejeté'),
    )
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/", unique=True, null=True)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    committee = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    needs = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def get_students(self):
        return Student.objects.filter(
            subscriptions__event=self
        )
