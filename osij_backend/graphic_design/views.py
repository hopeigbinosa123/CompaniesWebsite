# graphic_design/views.py
from rest_framework import viewsets, permissions, filters
from .models import Designer, DesignOrder
from .serializers import DesignerSerializer, DesignOrderSerializer

class IsAuthenticatedOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    pass


class DesignerViewSet(viewsets.ModelViewSet):
    queryset = Designer.objects.filter(is_active=True).order_by("name")
    serializer_class = DesignerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "specialties"]
    ordering_fields = ["name"]


class DesignOrderViewSet(viewsets.ModelViewSet):
    queryset = DesignOrder.objects.select_related("client", "designer").order_by("-created_at")
    serializer_class = DesignOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "brief", "status"]
    ordering_fields = ["created_at", "status"]

    def perform_create(self, serializer):
        # Client is the authenticated user by default
        serializer.save(client=self.request.user)
