from django.db import models
from django.utils import timezone
from travel_destinations.models import Hotel,Offer
from users.models import User

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    total_price=models.IntegerField()
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    adults_count = models.IntegerField()
    kids_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set to current datetime when object is created


    def save(self, *args, **kwargs):
        # Ensure that check_in_date is before check_out_date
        if self.check_in_date >= self.check_out_date:
            raise ValueError("Check-in date must be before check-out date")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}'s booking at {self.hotel.name}"
