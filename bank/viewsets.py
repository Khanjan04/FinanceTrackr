
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from bank.models import BankAccountTransaction, BankAccount
from bank.serializers import BankAccountTransactionSerializer, BankAccountSerializer


class BankAccountTransactionViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    # permission_classes = [IsAuthenticated]

    queryset = BankAccountTransaction.objects.all()
    serializer_class = BankAccountTransactionSerializer

    def create(self, request, *args, **kwargs):
        serializer = BankAccountTransactionSerializer(data=request.data)
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
            bankTransactionInstance = BankAccountTransaction.objects.get(id=id)
            serializer = BankAccountTransactionSerializer(bankTransactionInstance)
            return Response({
                'instance': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            bankTransaction = BankAccountTransaction.objects.filter()
            totalBankAccountTransaction = bankTransaction.count()
            serializer = BankAccountTransactionSerializer(bankTransaction, many=True)
            return Response({
                'bankTransaction': serializer.data,
                "totalBankAccountTransaction": totalBankAccountTransaction
            }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        id = int(request.query_params.get('id'))
        bankTransaction_instance = BankAccountTransaction.objects.get(id=id)
        serializer = BankAccountTransactionSerializer(bankTransaction_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        bankTransaction = BankAccountTransaction.objects.filter(id__in=ids)
        bankTransaction.delete()
        return Response({
            'message': "Success"
        }, status=status.HTTP_200_OK)


class BankAccountViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    # permission_classes = [IsAuthenticated]

    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

    def create(self, request, *args, **kwargs):
        serializer = BankAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': "Success"
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get("id"):
            id = int(request.query_params.get("id"))
            bankAccountInstance = BankAccount.objects.get(id=id)
            serializer = BankAccountSerializer(bankAccountInstance)
            return Response({
                'instance': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            bankAccount = BankAccount.objects.filter()
            totalBankAccount = bankAccount.count()
            serializer = BankAccountSerializer(bankAccount, many=True)
            return Response({
                'bankAccount': serializer.data,
                "totalBankAccount": totalBankAccount
            }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        id = int(request.query_params.get('id'))
        bankAccount_instance = BankAccount.objects.get(id=id)
        serializer = BankAccountSerializer(bankAccount_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({
                    'message': "Failure"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        bankAccount = BankAccount.objects.filter(id__in=ids)
        bankAccount.delete()
        return Response({
            'message': "Success"
        }, status=status.HTTP_200_OK)




# from rest_framework import viewsets, mixins
# from rest_framework.permissions import IsAuthenticated

# from bank.models import BankAccount, BankAccountTransaction
# from bank.serializers import BankAccountSerializer, BankAccountTransactionSerializer

# class BankAccountViewSet(
#     viewsets.GenericViewSet,
#     mixins.CreateModelMixin,
#     mixins.ListModelMixin,
#     mixins.UpdateModelMixin,
#     mixins.RetrieveModelMixin,
#     mixins.DestroyModelMixin,
# ):

#     permission_classes = [IsAuthenticated]
#     queryset = BankAccount.objects.all()
#     # def get_queryset(self):
#     #     return BankAccount.objects.filter(organization_id=self.request.user.user_data.organization_id)

#     serializer_class = BankAccountSerializer
#     # serializer_classes = {
#     #     "create": BankAccountSerializer,
#     #     "list": BankAccountSerializer,
#     #     "update": BankAccountSerializer,
#     #     "destroy": BankAccountSerializer,
#     #     "default": BankAccountSerializer,
#     # }

#     # def get_serializer_class(self):
#     #     return self.serializer_classes.get(
#     #         self.action, self.serializer_classes["default"]
#     #     )

#     def create(self, request, *args, **kwargs):
#         return super().create(request, *args, **kwargs)
    
#     def retrieve(self, request, *args, **kwargs):
#         return super().retrieve(request, *args, **kwargs)
    
#     def list(self, request, *args, **kwargs):
#         return super().list(request, *args, **kwargs)
    
#     def update(self, request, *args, **kwargs):
#         return super().update(request, *args, **kwargs)
    
#     def destroy(self, request, *args, **kwargs):
#         return super().destroy(request, *args, **kwargs)



# class BankAccountTransactionViewSet(
#     viewsets.GenericViewSet,
#     mixins.CreateModelMixin,
#     mixins.ListModelMixin,
#     mixins.UpdateModelMixin,
#     mixins.RetrieveModelMixin,
#     mixins.DestroyModelMixin,
# ):
    
#     queryset = BankAccountTransaction.objects.all()
#     # def get_queryset(self):
#     #     return BankAccountTransaction.objects.filter(organization_id=self.request.user.user_data.organization_id)

#     serializer_class = BankAccountTransactionSerializer
#     # serializer_classes = {
#     #     "create": BankAccountTransactionSerializer,
#     #     "list": BankAccountTransactionSerializer,
#     #     "update": BankAccountTransactionSerializer,
#     #     "destroy": BankAccountTransactionSerializer,
#     #     "default": BankAccountTransactionSerializer,
#     # }

#     # def get_serializer_class(self):
#     #     return self.serializer_classes.get(
#     #         self.action, self.serializer_classes["default"]
#     #     )

#     def create(self, request, *args, **kwargs):
#         return super().create(request, *args, **kwargs)
    
#     def retrieve(self, request, *args, **kwargs):
#         return super().retrieve(request, *args, **kwargs)
    
#     def list(self, request, *args, **kwargs):
#         return super().list(request, *args, **kwargs)
    
#     def update(self, request, *args, **kwargs):
#         return super().update(request, *args, **kwargs)
    
#     def destroy(self, request, *args, **kwargs):
#         return super().destroy(request, *args, **kwargs)


