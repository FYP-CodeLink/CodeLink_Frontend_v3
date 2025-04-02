// Types for code impacts
export type CodeImpact = {
  id: string
  changeId: string
  impactedFilePath: string
  impactedCode: string
  description: string
  severity: "high" | "medium" | "low"
}

// Mock impacts data for each file change
export const mockImpacts: Record<string, CodeImpact[]> = {
  // Product search pagination fix
  change3: [
    {
      id: "impact1",
      changeId: "change3",
      impactedFilePath: "pyshop/products/templates/products/product_list.html",
      impactedCode: `<div class="product-grid">
  {% for product in products %}
    <div class="product-card">
      <img src="{{ product.product_images.first.image.url }}" alt="{{ product.name }}">
      <h3>{{ product.name }}</h3>
      <p class="price">${"$"}{{ product.price }}</p>
      <a href="{{ product.get_absolute_url }}" class="btn">View Details</a>
    </div>
  {% endfor %}
</div>

{% if is_paginated %}
<nav class="pagination">
  <ul>
    {% if page_obj.has_previous %}
    <li><a href="?page={{ page_obj.previous_page_number }}">Previous</a></li>
    {% endif %}
    {% if page_obj.has_next %}
    <li><a href="?page={{ page_obj.next_page_number }}">Next</a></li>
    {% endif %}
  </ul>
</nav>
{% endif %}`,
      description:
        "The product list template relies on the prefetch_related optimization for product_images. Without this optimization, each product image access would trigger a separate database query, causing N+1 query problems and significantly slowing down page rendering. The pagination controls also need to be consistent with the search results pagination implementation.",
      severity: "high",
    },
    {
      id: "impact2",
      changeId: "change3",
      impactedFilePath: "pyshop/products/api/views.py",
      impactedCode: `class ProductAPIView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Product.objects.filter(
                Q(name__icontains=query) | 
                Q(description__icontains=query)
            )
        return Product.objects.all()`,
      description:
        "The API view for products doesn't include the same optimizations as the web view. It should be updated to filter by is_active and use select_related and prefetch_related to maintain consistency and performance across both interfaces. Without these changes, the API will return inactive products and suffer from performance issues when retrieving related data.",
      severity: "medium",
    },
  ],

  // Cart session fix
  change15: [
    {
      id: "impact3",
      changeId: "change15",
      impactedFilePath: "pyshop/cart/views.py",
      impactedCode: `@require_POST
def cart_add(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    form = CartAddProductForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(
            product=product,
            quantity=cd['quantity'],
            override_quantity=cd['override']
        )
    return redirect('cart:cart_detail')

@require_POST
def cart_remove(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect('cart:cart_detail')`,
      description:
        "The cart view functions directly use the Cart class which has been modified to handle session expiration. These views need to be aware of the session handling changes to properly respond when a cart session has expired. Without proper handling, users might experience unexpected behavior when their cart session expires during an active shopping session.",
      severity: "high",
    },
  ],

  // Inventory form
  change31: [
    {
      id: "impact4",
      changeId: "change31",
      impactedFilePath: "pyshop/inventory/views.py",
      impactedCode: `class InventoryAdjustmentCreateView(LoginRequiredMixin, CreateView):
    model = InventoryAdjustment
    form_class = InventoryAdjustmentForm
    template_name = 'inventory/adjustment_form.html'
    success_url = reverse_lazy('inventory:adjustment_list')
    
    def form_valid(self, form):
        form.instance.created_by = self.request.user
        response = super().form_valid(form)
        
        # Apply the adjustment to the variant's stock
        variant = form.instance.variant
        adjustment_type = form.instance.adjustment_type
        quantity = form.instance.quantity
        
        if adjustment_type == 'add':
            variant.stock += quantity
        elif adjustment_type == 'remove':
            variant.stock -= quantity
        elif adjustment_type == 'set':
            variant.stock = quantity
            
        variant.save()
        
        return response`,
      description:
        "The inventory adjustment view relies on the form validation to ensure that stock adjustments are valid. The changes to the InventoryAdjustmentForm affect how this view processes inventory changes. The view needs to trust that the form properly validates quantities, especially for removal operations, to prevent negative stock values. If the form validation fails to catch invalid adjustments, it could lead to inventory inconsistencies.",
      severity: "high",
    },
    {
      id: "impact5",
      changeId: "change31",
      impactedFilePath: "pyshop/inventory/signals.py",
      impactedCode: `@receiver(post_save, sender=InventoryAdjustment)
def create_stock_alert(sender, instance, created, **kwargs):
    """Create stock alerts when inventory falls below threshold."""
    if not created:
        return
        
    variant = instance.variant
    
    # Check if stock is below threshold after adjustment
    if variant.stock <= settings.LOW_STOCK_THRESHOLD:
        StockAlert.objects.get_or_create(
            variant=variant,
            alert_type='low_stock',
            defaults={
                'message': f'Low stock alert: {variant.product.name} ({variant.sku}) has {variant.stock} units remaining'
            }
        )
    
    # Check if out of stock
    if variant.stock == 0:
        StockAlert.objects.get_or_create(
            variant=variant,
            alert_type='out_of_stock',
            defaults={
                'message': f'Out of stock alert: {variant.product.name} ({variant.sku}) is out of stock'
            }
        )`,
      description:
        "The inventory signals system creates alerts based on stock levels after adjustments. The form validation changes ensure that stock removals don't exceed available quantities, which affects how these signals operate. Without proper validation, the system might fail to create appropriate alerts or might create incorrect alerts based on invalid stock levels.",
      severity: "medium",
    },
  ],
}

// Helper function to get impacts for a file change
export function getImpactsForChange(changeId: string): CodeImpact[] {
  return mockImpacts[changeId] || []
}

