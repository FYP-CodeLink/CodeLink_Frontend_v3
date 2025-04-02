import type { FileChange } from "@/lib/types"

// Mock file changes for each commit
export const mockFileChanges: Record<string, FileChange[]> = {
  // First commit in first branch (main)
  a1b2c3d: [
    {
      id: "change1",
      filePath: "README.md",
      changeType: "modified",
      diff: `@@ -1,5 +1,15 @@
# PyShop - Python eCommerce Platform

-A simple eCommerce platform built with Django.
+A comprehensive eCommerce platform built with Django and Python.
+
+## Deployment Instructions
+
+### Prerequisites
+- Python 3.9+
+- PostgreSQL 13+
+- Redis for caching
+
+### Production Deployment
+1. Set up environment variables (see \`.env.example\`)
+2. Run \`python manage.py migrate\` to set up the database
+3. Run \`python manage.py collectstatic\` for static files
+4. Configure Gunicorn and Nginx (see \`deployment/\` folder)`,
    },
    {
      id: "change2",
      filePath: "deployment/nginx.conf",
      changeType: "added",
      diff: `@@ -0,0 +1,25 @@
+# Nginx configuration for PyShop
+
+server {
+    listen 80;
+    server_name pyshop.example.com;
+    
+    location = /favicon.ico { 
+        access_log off; 
+        log_not_found off; 
+    }
+    
+    location /static/ {
+        root /var/www/pyshop;
+    }
+    
+    location /media/ {
+        root /var/www/pyshop;
+    }
+    
+    location / {
+        proxy_pass http://unix:/run/gunicorn.sock;
+        proxy_set_header Host $host;
+        proxy_set_header X-Real-IP $remote_addr;
+    }
+}`,
    },
  ],

  // Second commit in second branch (feature/payment-gateway)
  q4r5s6t: [
    {
      id: "change11",
      filePath: "pyshop/payments/views.py",
      changeType: "modified",
      diff: `@@ -1,10 +1,45 @@
from django.shortcuts import render, redirect
from django.conf import settings
+from django.http import JsonResponse
+from django.views.decorators.csrf import csrf_exempt
+import stripe
+import json
+from .models import Payment
+from orders.models import Order
+
+stripe.api_key = settings.STRIPE_SECRET_KEY

def payment_process(request):
-    # TODO: Implement payment processing
-    return render(request, 'payments/process.html')
+    order_id = request.session.get('order_id')
+    if not order_id:
+        return redirect('shop:product_list')
+    
+    try:
+        order = Order.objects.get(id=order_id)
+    except Order.DoesNotExist:
+        # Handle the case where the order does not exist
+        return redirect('shop:product_list')  # Or display an error message
+    
+    if request.method == 'POST':
+        # Create a payment intent
+        try:
+            intent = stripe.PaymentIntent.create(
+                amount=int(order.get_total_cost() * 100),
+                currency='usd',
+                metadata={'order_id': order.id}
+            )
+            
+            # Create a payment record
+            Payment.objects.create(
+                order=order,
+                stripe_payment_id=intent.id,
+                amount=order.get_total_cost(),
+                status='pending'
+            )
+            
+            return JsonResponse({'clientSecret': intent.client_secret})
+        except Exception as e:
+            return JsonResponse({'error': str(e)}, status=400)
+    
+    return render(request, 'payments/process.html', {
+        'order': order,
+        'client_id': settings.STRIPE_PUBLISHABLE_KEY,
+    })

def payment_done(request):
    return render(request, 'payments/done.html')
@@ -12,3 +47,25 @@ def payment_done(request):
def payment_canceled(request):
    return render(request, 'payments/canceled.html')

+@csrf_exempt
+def stripe_webhook(request):
+    payload = request.body
+    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
+    
+    try:
+        event = stripe.Webhook.construct_event(
+            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
+        )
+    except ValueError:
+        return JsonResponse({'error': 'Invalid payload'}, status=400)
+    except stripe.error.SignatureVerificationError:
+        return JsonResponse({'error': 'Invalid signature'}, status=400)
+    
+    if event.type == 'payment_intent.succeeded':
+        payment_intent = event.data.object
+        order_id = payment_intent.metadata.order_id
+        payment = Payment.objects.get(stripe_payment_id=payment_intent.id)
+        payment.status = 'completed'
+        payment.save()
+    
+    return JsonResponse({'success': True})`,
    },
  ],
}

