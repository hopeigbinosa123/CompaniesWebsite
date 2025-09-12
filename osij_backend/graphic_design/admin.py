from django.contrib import admin
from graphic_design.models import Designer, Order


class DesignerAdmin(admin.ModelAdmin):
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