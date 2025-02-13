from django.db import models

class Hospital(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    total_beds = models.IntegerField()
    available_beds = models.IntegerField()

    def __str__(self):
        return self.name

class Doctor(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="doctors", null=True, blank=True)
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Ambulance(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="ambulances", null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('Available', 'Available'), ('Busy', 'Busy')])
    current_location = models.CharField(max_length=255, default="Unknown")
    live_tracking_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Ambulance at {self.hospital.name if self.hospital else 'No Hospital'}"
