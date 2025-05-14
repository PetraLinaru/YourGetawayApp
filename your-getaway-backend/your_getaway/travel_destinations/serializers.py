from rest_framework import serializers
from .models import Destination, Hotel, Offer
import base64

class AvailableDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel.AvailableDate
        fields = ['date','to_date', 'adult_slots', 'kids_slots']

class HotelSerializer(serializers.ModelSerializer):
    available_dates = AvailableDateSerializer(many=True, read_only=True)
    

    class Meta:
        model = Hotel
        fields = ['id', 'name', 'stars_rating', 'description', 'price_per_night', 'pictures', 'available_dates']

class HotelDeserializer(serializers.ModelSerializer):
    available_dates = AvailableDateSerializer(many=True, read_only=True)
    pictures = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = ['id', 'name', 'stars_rating', 'description', 'price_per_night', 'pictures', 'available_dates','discount','location']
    def get_pictures(self, obj):
        with open(obj.pictures.path, 'rb') as file:
            image_data = file.read()
            return base64.b64encode(image_data).decode('utf-8')
    
    def get_discount(self, obj):
        offer = obj.offers.first()  # Assuming each hotel has at least one associated offer
        return offer.discount if offer else None
    
    def get_location(self, obj):
        offer = obj.offers.first()  # Assuming each hotel has at least one associated offer
        return offer.location if offer else None


class OfferSerializer(serializers.ModelSerializer):
    hotel = HotelSerializer()

    class Meta:
        model = Offer
        fields = ['id', 'location', 'destination', 'hotel', 'discount']
    
    def create(self, validated_data):
        hotel_data = validated_data.pop('hotel')
        hotel = Hotel.objects.create(**hotel_data)
        offer = Offer.objects.create(hotel=hotel, **validated_data)
        return offer
    
    def update(self, instance, validated_data):
        # Update Offer fields
        instance.location = validated_data.get('location', instance.location)
        instance.destination = validated_data.get('destination', instance.destination)
        instance.discount = validated_data.get('discount', instance.discount)

        # Nested hotel data
        hotel_data = validated_data.pop('hotel', None)
        if hotel_data:
            # Update or create nested Hotel instance
            hotel_serializer = self.fields['hotel']
            hotel_instance = instance.hotel
            hotel_instance = hotel_serializer.update(hotel_instance, hotel_data)
            instance.hotel = hotel_instance

        # Save and return updated Offer instance
        instance.save()
        return instance

class DestinationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Destination
        fields = ['id', 'name', 'photo']

        
class DestinationDeserializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    class Meta:
        model = Destination
        fields = ['id', 'name', 'photo']

    def get_photo(self, obj):
        with open(obj.photo.path, 'rb') as file:
            image_data = file.read()
            return base64.b64encode(image_data).decode('utf-8')

