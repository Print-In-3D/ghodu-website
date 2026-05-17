from django.db import models

class Topic(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    icon = models.CharField(max_length=100) # e.g. "Key", "Palette", "Gamepad2"
    desc = models.TextField()
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    product_id = models.CharField(max_length=100, unique=True) # e.g. "2-1", "3-5"
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    images = models.JSONField(default=list, blank=True) # e.g. ["/images/products/..."]
    desc = models.TextField()
    full_details = models.TextField(blank=True, null=True)
    specs = models.JSONField(default=dict, blank=True) # e.g. {"material": "PLA"}
    features = models.JSONField(default=list, blank=True) # e.g. ["Personalized", "Durable"]
    customizable = models.BooleanField(default=False)
    customization_label = models.CharField(max_length=255, blank=True, null=True)
    customization_placeholder = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.topic.title}: {self.name}"
