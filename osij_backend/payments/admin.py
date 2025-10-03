from django.contrib import admin
from .models import Payment

# Register your models here.


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "paypalOrder_id",
        "user",
        "amount",
        "currency",
        "status",
        "date_created",
    )
    list_filter = ("status", "currency", "date_created")
    search_fields = ("paypal_order_id", "user__email", "user__username")
    readonly_fields = ("date_created", "date_updated", "payment_details")
    date_hierarchy = "date_created"
