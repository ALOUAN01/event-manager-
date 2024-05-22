from rest_framework import serializers
from .subscription_models import Subscription
from .student_serializers import StudentShortSerializer


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('student',
                  'event'

                  )


class SubscriptionGetSerializer(serializers.ModelSerializer):
    student = StudentShortSerializer()

    class Meta:
        model = Subscription
        fields = ('student',
                  'event'
                  )
