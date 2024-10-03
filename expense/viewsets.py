
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from expense.models import Expense
from expense.serializers import ExpenseSerializer


class ExpenseViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    # permission_classes = [IsAuthenticated]

    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def create(self, request, *args, **kwargs):
        serializer = ExpenseSerializer(data=request.data)
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
            expenseInstance = Expense.objects.get(id=id)
            serializer = ExpenseSerializer(expenseInstance)
            return Response({
                'instance': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            expense = Expense.objects.filter()
            totalExpense = expense.count()
            serializer = ExpenseSerializer(expense, many=True)
            return Response({
                'expense': serializer.data,
                "totalExpense": totalExpense
            }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        id = int(request.query_params.get('id'))
        expense_instance = Expense.objects.get(id=id)
        serializer = ExpenseSerializer(expense_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        expense = Expense.objects.filter(id__in=ids)
        expense.delete()
        return Response({
            'message': "Success"
        }, status=status.HTTP_200_OK)



