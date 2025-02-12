from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item
from .serializers import ItemSerializer
from django.http import JsonResponse
from .models import Doctor, Bed, Ambulance, MedicalTool

@api_view(['GET'])
def item_list(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

def doctor_availability(request):
    doctors = Doctor.objects.filter(is_available=True).values()
    return JsonResponse(list(doctors), safe=False)

def bed_availability(request):
    beds = Bed.objects.filter(is_available=True).values()
    return JsonResponse(list(beds), safe=False)

def ambulance_status(request):
    ambulances = Ambulance.objects.all().values()
    return JsonResponse(list(ambulances), safe=False)

def medical_tools(request):
    tools = MedicalTool.objects.all().values()
    return JsonResponse(list(tools), safe=False)
