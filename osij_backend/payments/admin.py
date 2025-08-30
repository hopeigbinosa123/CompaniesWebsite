from django.contrib import admin
from .models import Payment

# Register your models here.

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('paypal_order_id', 'user', 'amount', 'currency', 'status', 'created_at')
    list_filter = ('status', 'currency', 'created_at')
    search_fields = ('paypal_order_id', 'user__email', 'user__username')
    readonly_fields = ('created_at', 'updated_at', 'payment_details')
    date_hierarchy = 'created_at'
