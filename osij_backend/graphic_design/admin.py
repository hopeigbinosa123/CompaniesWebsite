from django.contrib import admin
from graphic_design.models import Designer, Order

# Register your models here.

class DesignerAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')
    search_fields = ['name']
admin.site.register(Designer, DesignerAdmin)

class OrderAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ('id', 'email', 'title', 'design_type', 'description', 'ordered_at', 'status')
    list_filter = ['ordered_at', 'status', ]
    search_fields = ('name', 'title')
=======
    list_display = ('get_user_name', 'email', 'title', 'design_type', 'description', 'ordered_at', 'status')
    list_filter = ['ordered_at', 'status']
    search_fields = ('user__first_name', 'user__last_name', 'title')
    
    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_user_name.short_description = 'Name'
    
>>>>>>> 522c70507cd174da0716939968338d26db015389
admin.site.register(Order, OrderAdmin)