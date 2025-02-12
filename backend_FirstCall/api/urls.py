from django.urls import path
from .views import item_list, doctor_availability, bed_availability, ambulance_status, medical_tools, fetch_real_data

urlpatterns = [
    path('items/', item_list, name='item-list'),  # Add this line
    path('doctors/', doctor_availability, name='doctor-availability'),
    path('beds/', bed_availability, name='bed-availability'),
    path('ambulances/', ambulance_status, name='ambulance-status'),
    path('tools/', medical_tools, name='medical-tools'),
    path('real-data/', fetch_real_data, name='fetch-real-data'),
]
