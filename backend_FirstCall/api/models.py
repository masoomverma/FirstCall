from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name
    
class Doctor(models.Model):
    name = models.CharField(max_length=100)
    available = models.BooleanField(default=True)

class Bed(models.Model):
    total_beds = models.IntegerField()
    available_beds = models.IntegerField()

class Ambulance(models.Model):
    number = models.CharField(max_length=20)
    status = models.CharField(max_length=20)  # e.g., Available, Busy

class MedicalTool(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
