from django.contrib import admin
from graphic_design.models import Designer, Order

# Register your models here.

class DesignerAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')
    search_fields = ['name']
admin.site.register(Designer, DesignerAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'title', 'design_type', 'description', 'ordered_at', 'status')
    list_filter = ['ordered_at', 'status', ]
    search_fields = ('name', 'title')
admin.site.register(Order, OrderAdmin)