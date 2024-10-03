from django.db import models

# Create your models here.

class BankAccount(models.Model):
    BANK = [
        ("hdfc", "HDFC"),
        ("icici", "ICICI"),
        ("sbi", "SBI"),
    ]
    
    displayName = models.CharField(max_length=128, blank=False, null=False)
    bank = models.CharField(max_length=128, choices=BANK, blank=False, null=False)
    accountNo = models.BigIntegerField(null=True)
    ifscode = models.CharField(max_length=128, null=True)


class BankAccountTransaction(models.Model):
    TRANSACTION_TYPE = [
        ("debit", "Debit"),
        ("credit", "Credit"),
    ]

    date = models.BigIntegerField(null=False)
    tranType = models.CharField(max_length=128, choices=TRANSACTION_TYPE, blank=False, null=False)
    bankAccount = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    amount = models.BigIntegerField(null=False, blank=False, default=0)
    decription = models.TextField(blank=False, null=False)

