from django.db import models

# Create your models here.

class Expense(models.Model):
    EXPENSE_TYPE = [
        ("home", "Home"),
        ("miscellaneous", "Miscellaneous"),
        ("travelling", "Travelling"),
        ("med_learning", "Medical/Learning"),
        ("shop_party", "Shopping/Party"),
        ("special", "Special"),
    ]
    
    date = models.BigIntegerField(null=False)
    type = models.CharField(max_length=128, choices=EXPENSE_TYPE, blank=False, null=False)
    amount = models.BigIntegerField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)


