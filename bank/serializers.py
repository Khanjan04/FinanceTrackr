from rest_framework import serializers
from bank.models import BankAccount, BankAccountTransaction


class BankAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankAccount
        fields = "__all__"

class BankAccountTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankAccountTransaction
        fields = "__all__"

