from django.db import models
from datetime import datetime, timedelta

class Destination(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='destination_photos/')
    
    def __str__(self):
        return self.name

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    stars_rating = models.IntegerField()
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    pictures = models.ImageField(upload_to='hotel_pictures/')
    
    # Available dates structure
    class AvailableDate(models.Model):
        hotel = models.ForeignKey('Hotel', related_name='available_dates', on_delete=models.CASCADE)
        date = models.DateField()
        to_date = models.DateField(default=datetime.now() + timedelta(days=7))
        adult_slots = models.IntegerField(default=0)
        kids_slots = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Offer(models.Model):
    location = models.CharField(max_length=100)
    destination = models.ForeignKey(Destination, related_name='offers', on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, related_name='offers', on_delete=models.CASCADE)
    discount = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.location} - {self.destination}"
