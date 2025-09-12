# graphic_design/admin.py
from django.contrib import admin
<<<<<<< HEAD
from .models import Designer, DesignOrder
=======
from graphic_design.models import Designer, Order

>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4

@admin.register(Designer)
class DesignerAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ("name", "specialties", "portfolio_url", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "specialties", "email")

@admin.register(DesignOrder)
class DesignOrderAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "designer", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "brief")
    autocomplete_fields = ("client", "designer")
=======
    list_display = ('name', 'image')
    search_fields = ['name']


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_user_name', 'email', 'title', 'design_type', 'description', 'ordered_at', 'status')
    list_filter = ['ordered_at', 'status']
    search_fields = ('user__first_name', 'user__last_name', 'title', 'email', 'name')
    readonly_fields = ('ordered_at',)  # Make ordered_at read-only in admin
    
    def get_user_name(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}"
        return "No user"
    get_user_name.short_description = 'Name'


# Register models at the bottom
admin.site.register(Designer, DesignerAdmin)
admin.site.register(Order, OrderAdmin)
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
