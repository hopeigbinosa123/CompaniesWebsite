from django.contrib import admin
from .models import Designer

@admin.register(Designer)
class DesignerAdmin(admin.ModelAdmin):
    list_display = ("name", "get_specialties", "is_active")
    search_fields = ["name", "specialties__name"]

    def get_specialties(self, obj):
        return ", ".join([s.name for s in obj.specialties.all()])
    get_specialties.short_description = "Specialties"
