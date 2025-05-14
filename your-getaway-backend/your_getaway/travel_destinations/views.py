from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Destination, Offer, Hotel
from .serializers import DestinationSerializer, HotelSerializer,OfferSerializer,AvailableDateSerializer,DestinationDeserializer,HotelDeserializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from datetime import datetime
from django.db.models import Q





@api_view(['GET'])
def destination_list(request):
    if request.method == 'GET':
        destinations = Destination.objects.all()
        serializer = DestinationDeserializer(destinations, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def destination_filter_by_name(request):
    if request.method == 'GET':
        name = request.query_params.get('name', None)
        if name:
            destinations = Destination.objects.filter(name__icontains=name)
            serializer = DestinationDeserializer(destinations, many=True)
            return Response(serializer.data)
        else:
            return Response("Name parameter is required.", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def destination_detail(request, pk):
    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DestinationSerializer(destination)
        return Response(serializer.data)


@api_view(['POST'])
def destination_create(request):
    if request.method == 'POST':
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
destination_create.parser_classes = [MultiPartParser, FormParser]


@api_view(['PUT'])
def destination_update(request, pk):
    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DestinationSerializer(destination, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def destination_delete(request, pk):
    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        destination.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['DELETE'])
def delete_destination_by_name(request, name):
    try:
        Destination.objects.filter(name=name).delete()
        return Response('Destination deleted successfully')
    except Destination.DoesNotExist:
        return Response('Destination not found', status=404)
    except Exception as e:
        return Response(f'Error deleting destination: {str(e)}', status=500)

@api_view(['POST'])
def add_offer_to_destination(request, destination_id):
    if request.method == 'POST':
        try:
            destination = Destination.objects.get(pk=destination_id)
            serializer = OfferSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(destination=destination)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Destination.DoesNotExist:
            return Response({"message": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def edit_offer_in_destination(request, destination_id, offer_id):
    try:
        offer = Offer.objects.get(id=offer_id, destination_id=destination_id)
    except Offer.DoesNotExist:
        return Response({"error": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = OfferSerializer(offer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_offer_from_destination(request,  offer_id):
    try:
        # Find the offer with the specified hotel ID
        offer = Offer.objects.get(hotel__id=offer_id)
    except Offer.DoesNotExist:
        return Response({"error": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['POST'])
def add_hotel_to_offer(request, offer_id):
    if request.method == 'POST':
        try:
            offer = Offer.objects.get(pk=offer_id)
            serializer = HotelSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(offer=offer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Offer.DoesNotExist:
            return Response({"message": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_available_date_to_hotel(request, hotel_id):
    if request.method == 'POST':
        try:
            hotel = Hotel.objects.get(pk=hotel_id)
            serializer = AvailableDateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(hotel=hotel)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Hotel.DoesNotExist:
            return Response({"message": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['DELETE'])
def delete_available_date_from_hotel(request, hotel_id,id):
    try:
        # Find the offer with the specified hotel ID
        availableDate = Hotel.AvailableDate.objects.get(hotel=hotel_id,id=id)
    except Hotel.AvailableDate.DoesNotExist:
        return Response({"error": "Slot not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        availableDate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['PUT'])
def edit_available_date(request, hotel_id, date_id):
    try:
        # Retrieve the hotel object
        hotel = Hotel.objects.get(id=hotel_id)

        # Retrieve the specific available date object using filter
        available_date = Hotel.AvailableDate.objects.filter(hotel=hotel, id=date_id).first()

        if not available_date:
            return Response({"error": "Available date not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'PUT':
            serializer = AvailableDateSerializer(available_date, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Hotel.DoesNotExist:
        return Response({"error": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_hotels_by_destination_name(request, location_name):
    try:
        # Query offers where destination name matches the location_name
        offers = Offer.objects.filter(destination__name__iexact=location_name)
        
        # Get the hotels associated with the offers
        hotels = [offer.hotel for offer in offers]

        # Paginate the hotels
        paginator = Paginator(hotels, 10)  # Example: 10 items per page
        page_number = request.query_params.get('page', 1)
        page_obj = paginator.get_page(page_number)

        # Serialize the paginated hotels
        serializer = HotelDeserializer(page_obj.object_list, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Offer.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_hotel_data(request, location, hotel_id):
    try:
        print(location,hotel_id)
        # Retrieve the offer based on the location
        
        
        # Access the hotel ID from the offer
    
        
        # Retrieve the hotel using the obtained ID
        hotel = Hotel.objects.get(id=hotel_id)
        
        # Serialize the hotel data if needed
        serializer = HotelDeserializer(hotel)
        print(serializer)
        # Create the response and set the appropriate renderer
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Offer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Hotel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_destinations_with_hotels_and_dates(request):
    destinations_with_hotels = []
    destinations = Destination.objects.all()

    for destination in destinations:
        destination_data = {
            'id': destination.id,
            'name': destination.name,
            'hotels': []
        }

        offers = destination.offers.all()
        for offer in offers:
            hotel_data = {
                'id': offer.hotel.id,
                'name': offer.hotel.name,
                'location':offer.location,
                'stars_rating': offer.hotel.stars_rating,
                'description': offer.hotel.description,
                'price_per_night': offer.hotel.price_per_night,
                'discount': offer.discount,
                'available_dates': []
            }

            available_dates = offer.hotel.available_dates.all()
            for available_date in available_dates:
                date_data = {
                    'id': available_date.id,
                    'date': available_date.date,
                    'to_date':available_date.to_date,
                    'adult_slots': available_date.adult_slots,
                    'kids_slots': available_date.kids_slots
                }
                hotel_data['available_dates'].append(date_data)

            destination_data['hotels'].append(hotel_data)

        destinations_with_hotels.append(destination_data)

    return Response(destinations_with_hotels)

@api_view(['GET'])
def filter_hotels_by_date_range(request, location, start_date, end_date):
    # Convert start_date and end_date strings to datetime objects
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')

    # Get all offers for the specified location
    offers = Offer.objects.filter(destination__name=location)

    # Get all hotel IDs with available dates within the date range
    available_hotel_ids = Hotel.AvailableDate.objects.filter(
        Q(date__lte=start_date) & Q(to_date__gte=end_date) &
        ((Q(kids_slots__gte=0)&Q(adult_slots__gt=0))|(Q(kids_slots__gt=0)&Q(adult_slots__gte=0)))
    ).values_list('hotel_id', flat=True).distinct()

    # Filter offers for hotels with available dates in the specified range
    offers = offers.filter(hotel_id__in=available_hotel_ids)

    # Get unique hotel IDs from the filtered offers
    hotel_ids = offers.values_list('hotel_id', flat=True).distinct()

    # Return hotels corresponding to the unique hotel IDs
    hotels_to_return = Hotel.objects.filter(id__in=hotel_ids)

    # Serialize the hotels
    serializer = HotelDeserializer(hotels_to_return, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)