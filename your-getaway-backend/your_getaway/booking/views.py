from django.shortcuts import render
from .models import Booking, Hotel,User
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import BookingSerializer
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def create_booking(request):
    # Retrieve parameters from the request body
    username = request.data.get('username')
    hotel_name = request.data.get('hotel_name')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    num_adults = int(request.data.get('num_adults'))
    num_kids = int(request.data.get('num_kids'))
    total_price=int(request.data.get('total_price'))

    # Check if the user exists
    user = User.objects.filter(username=username).first()
    

    # Check if the hotel exists
    hotel = Hotel.objects.filter(name=hotel_name).first()
    print(hotel)
    print('start',start_date)
    print('end',end_date)
    print('kids',num_kids),
    print('adults',num_adults)

    # Check availability
    if hotel:
        available_dates = Hotel.AvailableDate.objects.filter(
            hotel=hotel.id,
            date__lte=start_date,
            to_date__gte=end_date,
            kids_slots__gte=num_kids,
            adult_slots__gte=num_adults
        )

        print(available_dates)

        if not available_dates:
            # Handle case when hotel is fully booked for the requested dates
            return Response({'error': 'Hotel fully booked for the requested dates'}, status=400)

        
        for date in available_dates:
            print(date.adult_slots ,date.kids_slots)
            if(date.adult_slots-num_adults>0 and date.kids_slots-num_kids>0):
            # Create booking record
                booking = Booking.objects.create(
                    user=user,
                    hotel=hotel,
                    check_in_date=start_date,
                    check_out_date=end_date,
                    adults_count=num_adults,
                    kids_count=num_kids,
                    total_price=total_price,
                    created_at=datetime.now()
                )

                # Update available slots
                for date in available_dates:
                    date.adult_slots -= num_adults
                    date.kids_slots -= num_kids
                    date.save()

                # Serialize the booking data
                serializer = BookingSerializer(booking)
                
                # Return serialized data with success status
                return Response(serializer.data, status=201)
        return Response('Fully Booked', status=400)
    
@api_view(['GET'])
def get_bookings(request,hotel_id):
    print(request)
    bookings = Booking.objects.filter(hotel_id=hotel_id)
    
    # Format bookings into events
    events = []
    for booking in bookings:
        event = {
            'title': f"Booking with ID {booking.id}",
            'start': booking.check_in_date.strftime('%Y-%m-%d'),
            'end': booking.check_out_date.strftime('%Y-%m-%d'),
            'created_at':booking.created_at
        }
        events.append(event)
    
    print(events)
    
    # Return events as JSON response
    return Response(events, status=200)