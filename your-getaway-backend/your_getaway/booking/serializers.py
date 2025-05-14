from .models import Booking
from rest_framework import serializers

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'hotel', 'check_in_date', 'check_out_date', 'adults_count', 'kids_count','total_price']