from django import forms
from products.models import ProductVariant
from .models import InventoryAdjustment


class InventoryAdjustmentForm(forms.ModelForm):
    """Form for inventory adjustments."""
    
    class Meta:
        model = InventoryAdjustment
        fields = ['variant', 'adjustment_type', 'quantity', 'reason']
        widgets = {
            'reason': forms.Textarea(attrs={'rows': 3}),
        }
    
    def clean(self):
        cleaned_data = super().clean()
        adjustment_type = cleaned_data.get('adjustment_type')
        quantity = cleaned_data.get('quantity')
        variant = cleaned_data.get('variant')
        
        if not variant or not adjustment_type or not quantity:
            return cleaned_data
            
        # Validate that quantity is positive for add/remove
        if adjustment_type in ['add', 'remove'] and quantity <= 0:
            self.add_error(
                'quantity', 
                'Quantity must be positive for adding or removing stock.'
            )
        
        # Validate that we don't remove more than available
        if adjustment_type == 'remove' and quantity > variant.stock:
            self.add_error(
                'quantity',
                f'Cannot remove {quantity} units. Only {variant.stock} in stock.'
            )
            
        return cleaned_data

