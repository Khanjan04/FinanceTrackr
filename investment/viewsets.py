
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from investment.models import Investment
from investment.serializers import InvestmentSerializer


class InvestmentViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    # permission_classes = [IsAuthenticated]

    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = InvestmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({
            'message': "Success"
        }, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get("id"):
            id = int(request.query_params.get("id"))
            investmentInstance = Investment.objects.get(id=id)
            serializer = InvestmentSerializer(investmentInstance)
            return Response({
                'instance': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            investment = Investment.objects.filter()
            totalInvestment = investment.count()
            serializer = InvestmentSerializer(investment, many=True)
            return Response({
                'investment': serializer.data,
                "totalInvestment": totalInvestment
            }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        id = int(request.query_params.get('id'))
        investment_instance = Investment.objects.get(id=id)
        serializer = InvestmentSerializer(investment_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({"message": "Success"}, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        investment = Investment.objects.filter(id__in=ids)
        investment.delete()
        return Response({
            'message': "Success"
        }, status=status.HTTP_200_OK)



