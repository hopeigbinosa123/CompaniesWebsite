from rest_framework import viewsets, permissions, filters, generics
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from .models import Designer, DesignOrder
from .serializers import DesignerSerializer, DesignOrderSerializer


# Permissions
class IsAuthenticatedOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    pass


# Designer ViewSet (used for /api/designers/)
class DesignerViewSet(viewsets.ModelViewSet):
    queryset = Designer.objects.filter(is_active=True).order_by("name")
    serializer_class = DesignerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "speciality"]
    ordering_fields = ["name"]


# Design Order ViewSet
class DesignOrderViewSet(viewsets.ModelViewSet):
    queryset = DesignOrder.objects.select_related("client", "designer").order_by(
        "-created_at"
    )
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "brief", "status"]
    ordering_fields = ["created_at", "status"]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(client=self.request.user)
        else:
            serializer.save()


# The Public list view for designers
class DesignerListView(ListAPIView):
    queryset = Designer.objects.filter(is_active=True).order_by("name")
    serializer_class = DesignerSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "speciality"]
    ordering_fields = ["name"]


# Public detail view for a single designer
class DesignerDetailView(RetrieveAPIView):
    queryset = Designer.objects.filter(is_active=True)
    serializer_class = DesignerSerializer
    permission_classes = [permissions.AllowAny]


# Create a new design order
class OrderCreateView(CreateAPIView):
    queryset = DesignOrder.objects.all()
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


# List orders made by the authenticated user
class UserOrderListView(ListAPIView):
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignOrder.objects.filter(client=self.request.user).order_by(
            "-created_at"
        )


# Retrieve details of a specific order
class OrderDetailView(RetrieveAPIView):
    queryset = DesignOrder.objects.select_related("client", "designer")
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAuthenticated]


# Admin-only view to update an order
class OrderUpdateView(UpdateAPIView):
    queryset = DesignOrder.objects.all()
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAdminUser]

class DesignOrderDeleteView(generics.DestroyAPIView):
    queryset = DesignOrder.objects.all()
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignOrder.objects.filter(client=self.request.user)
