from rest_framework import serializers
from investment.models import Investment


class InvestmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Investment
        fields = "__all__"

