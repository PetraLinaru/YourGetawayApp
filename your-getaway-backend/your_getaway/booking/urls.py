from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.create_booking),
    path('get/<int:hotel_id>/',views.get_bookings)
]
