from django.contrib import admin
from .student_models import Student
from .models import EventRequest
from .subscription_models import Subscription
# Register your models here.
models_list = [EventRequest,Student,Subscription]
admin.site.register(models_list)