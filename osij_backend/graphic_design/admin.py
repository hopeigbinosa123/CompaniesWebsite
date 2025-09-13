from django.contrib import admin
from .models import Designer, DesignOrder, Portfolio, DesignService

@admin.register(Designer)
class DesignerAdmin(admin.ModelAdmin):
    list_display = ("name", "get_specialties", "is_active")
    search_fields = ["name", "specialties__name"]

    def get_specialties(self, obj):
        return ", ".join([s.name for s in obj.specialties.all()])
    get_specialties.short_description = "Specialties"

@admin.register(DesignOrder)
class DesignOrderAdmin(admin.ModelAdmin):
    list_display = ("client", "designer", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("client__username", "designer__name")

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ("designer", "title", "created_at")

@admin.register(DesignService)
class DesignServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "duration_minutes")
