
from django.urls import path
from . import views


urlpatterns = [
    path('destination_create/', views.destination_create, name="destination_create"),
    path('destinations/', views.destination_list, name="destination_list"),
    path('search_destinations/',views.destination_filter_by_name,name="destination_filter_by_name"),
    path('destination/<int:destination_id>/add_offer/', views.add_offer_to_destination),
    path('destination/<int:pk>/delete/', views.destination_delete),
    path('destination/<int:pk>/update/', views.destination_update),
    path('offer/<int:destination_id>/<int:offer_id>/update',views.edit_offer_in_destination),
    path('offer/<int:offer_id>/delete/',views.delete_offer_from_destination),
    path('offer/<int:offer_id>/add_hotel/', views.add_hotel_to_offer),
    path('hotel/<int:hotel_id>/add_available_date/', views.add_available_date_to_hotel),
    path('hotel/<int:hotel_id>/<int:id>/delete_available_date/', views.add_available_date_to_hotel),
    path('hotel/<int:hotel_id>/<int:date_id>/update_date/', views.edit_available_date),
    path('hotel/<int:hotel_id>/<int:id>/delete_date/', views.delete_available_date_from_hotel),
    path('hotels/<str:location>/<int:hotel_id>', views.get_hotel_data),
    path('hotels/filter/<str:location>/<str:start_date>/<str:end_date>',views.filter_hotels_by_date_range),
    path('offers/', views.get_destinations_with_hotels_and_dates),
    path('offers/location/<location_name>', views.get_hotels_by_destination_name),
    path('/destination/delete/<name>/',views.delete_destination_by_name)
  
]
