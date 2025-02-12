from django.urls import path
from .views import item_list, doctor_availability, bed_availability, ambulance_status, medical_tools

urlpatterns = [
    path('items/', item_list, name='item-list'),  # Add this line
    path('doctors/', doctor_availability, name='doctor-availability'),
    path('beds/', bed_availability, name='bed-availability'),
    path('ambulances/', ambulance_status, name='ambulance-status'),
    path('tools/', medical_tools, name='medical-tools'),
]
