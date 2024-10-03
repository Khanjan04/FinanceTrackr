from django.db import models

# Create your models here.

class Investment(models.Model):
    INVESTMENT_TYPE = [
        ("fd", "FD"),
        ("nps", "NPS"),
        ("mf", "Mutual Fund"),
        ("stock", "Stock"),
    ]

    date = models.BigIntegerField(null=False, blank=False)
    type = models.CharField(max_length=128, choices=INVESTMENT_TYPE, null=False, blank=False)
    amount = models.BigIntegerField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)

