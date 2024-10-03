
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from income.models import Income
from income.serializers import IncomeSerializer


class IncomeViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    # permission_classes = [IsAuthenticated]

    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

    def create(self, request, *args, **kwargs):
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': "Success"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get("id"):
            id = int(request.query_params.get("id"))
            incomeInstance = Income.objects.get(id=id)
            serializer = IncomeSerializer(incomeInstance)
            return Response({
                'instance': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            income = Income.objects.filter()
            totalIncome = income.count()
            serializer = IncomeSerializer(income, many=True)
            return Response({
                'income': serializer.data,
                "totalIncome": totalIncome
            }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        id = int(request.query_params.get('id'))
        income_instance = Income.objects.get(id=id)
        serializer = IncomeSerializer(income_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        income = Income.objects.filter(id__in=ids)
        income.delete()
        return Response({
            'message': "Success"
        }, status=status.HTTP_200_OK)



