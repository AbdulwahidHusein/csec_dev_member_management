from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    start_time = models.TimeField()
    duration = models.FloatField()
    description_image = models.ImageField(upload_to="images/events")
    wait_for = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return self.title
    
class Anouncement(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=300)
    description_image = models.ImageField(upload_to="images/announcements")
    delete_at = models.DateTimeField()
    
    def __str__(self) -> str:
        return self.title