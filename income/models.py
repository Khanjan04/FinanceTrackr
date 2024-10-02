from django.db import models

# Create your models here.

class Income(models.Model):
    INCOME_TYPE = [
        ("miniorange", "miniOrange"),
        ("freelance", "Freelance"),
        ("dad", "Dad"),
        ("invts_sold", "Invts Sold"),
        ("refund", "Refund"),
    ]

    date = models.BigIntegerField(null=False, blank=False)
    type = models.CharField(max_length=128, choices=INCOME_TYPE, null=False, blank=False)
    amount = models.BigIntegerField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)


