from django.contrib import admin
from payments.models import Payment

@admin.register(Payment)
class PaymentAddmin(admin.ModelAdmin):
    list_display = ['id', 'table', 'statusPayment', 'paymentType', 'created_at']


