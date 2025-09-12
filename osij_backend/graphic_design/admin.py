# graphic_design/admin.py
from django.contrib import admin
from .models import Designer, DesignOrder

@admin.register(Designer)
class DesignerAdmin(admin.ModelAdmin):
    list_display = ("name", "specialties", "portfolio_url", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "specialties", "email")

@admin.register(DesignOrder)
class DesignOrderAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "designer", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "brief")
    autocomplete_fields = ("client", "designer")