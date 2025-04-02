import type { CodeImpact } from "@/lib/types"

// Mock impacts data for each file change
export const mockImpacts: Record<string, CodeImpact[]> = {
  // First commit in first branch (main)
  change1: [
    {
      id: "impact1",
      changeId: "change1",
      impactedFilePath: "deployment/deploy.sh",
      impactedCode: `#!/bin/bash
# Deployment script for PyShop

# Check if .env file exists
if [ ! -f .env ]; then
 echo "Error: .env file not found. Please create one based on .env.example"
 exit 1
fi

# Load environment variables
source .env

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Restart Gunicorn
echo "Restarting Gunicorn..."
systemctl restart gunicorn

# Reload Nginx
echo "Reloading Nginx configuration..."
nginx -t && systemctl reload nginx

echo "Deployment completed successfully!"`,
      description:
        "The deployment script needs to be updated to align with the new deployment instructions in the README. Without these changes, the automated deployment process won't check for environment variables or properly set up the static files as described in the documentation.",
      severity: "medium",
    },
  ],

  // Second commit in second branch (feature/payment-gateway)
  change11: [
    {
      id: "impact3",
      changeId: "change11",
      impactedFilePath: "pyshop/orders/models.py",
      impactedCode: `from django.db import models
from django.conf import settings
from products.models import Product
from decimal import Decimal

class Order(models.Model):
   user = models.ForeignKey(settings.AUTH_USER_MODEL,
                            related_name='orders',
                            on_delete=models.CASCADE,
                            null=True, blank=True)
   first_name = models.CharField(max_length=50)
   last_name = models.CharField(max_length=50)
   email = models.EmailField()
   address = models.CharField(max_length=250)
   postal_code = models.CharField(max_length=20)
   city = models.CharField(max_length=100)
   created = models.DateTimeField(auto_now_add=True)
   updated = models.DateTimeField(auto_now=True)
   paid = models.BooleanField(default=False)
   
   class Meta:
       ordering = ('-created',)
   
   def __str__(self):
       return f'Order {self.id}'
   
   def get_total_cost(self):
       return sum(item.get_cost() for item in self.items.all())
   
   def mark_as_paid(self):
       self.paid = True
       self.save()


class OrderItem(models.Model):
   order = models.ForeignKey(Order,
                            related_name='items',
                            on_delete=models.CASCADE)
   product = models.ForeignKey(Product,
                              related_name='order_items',
                              on_delete=models.CASCADE)
   price = models.DecimalField(max_digits=10, decimal_places=2)
   quantity = models.PositiveIntegerField(default=1)
   
   def __str__(self):
       return str(self.id)
   
   def get_cost(self):
       return self.price * self.quantity`,
      description:
        "The Order model needs to be updated to work with the new payment processing system. The current model only has a simple 'paid' flag, but now needs to track payment status and potentially store payment IDs for reference.",
      severity: "high",
    },
  ],
}

