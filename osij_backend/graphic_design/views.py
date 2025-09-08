from rest_framework import generics, permissions
from .models import Designer, Order
from .serializers import DesignerSerializer, OrderSerializer, UpdateStatusSerializer # Import UpdateStatusSerializer

class DesignerListView(generics.ListAPIView):
    queryset = Designer.objects.all()
    serializer_class = DesignerSerializer
    permission_classes = [permissions.AllowAny]

class DesignerDetailView(generics.RetrieveAPIView):
    queryset = Designer.objects.all()
    serializer_class = DesignerSerializer
    permission_classes = [permissions.AllowAny]

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

# Admin/Staff View
class OrderUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateStatusSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk' # Assuming primary key for lookup
