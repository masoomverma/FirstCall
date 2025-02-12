from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)

class Bed(models.Model):
    number = models.IntegerField()
    is_available = models.BooleanField(default=True)

class Ambulance(models.Model):
    status = models.CharField(max_length=50)  # e.g., "available", "on duty"

class MedicalTool(models.Model):
    name = models.CharField(max_length=100)
