// Types for unit tests
export type UnitTest = {
  id: string
  changeId: string
  testCode: string
  description: string
  testType: "unit" | "integration" | "e2e"
  framework: "pytest" | "unittest" | "jest" | "vitest"
}

// Mock unit tests for each file change
export const mockUnitTests: Record<string, UnitTest[]> = {
  // Product search pagination fix
  change3: [
    {
      id: "test1",
      changeId: "change3",
      testType: "unit",
      framework: "pytest",
      description: "Test that product search filters by active products",
      testCode: `import pytest
from django.urls import reverse
from django.test import RequestFactory
from products.models import Product, Category
from products.views import ProductSearchView

@pytest.mark.django_db
def test_product_search_filters_active_products():
    # Create test data
    category = Category.objects.create(name="Test Category", slug="test-category")
    
    # Create active product
    active_product = Product.objects.create(
        category=category,
        name="Active Test Product",
        slug="active-test-product",
        price=10.00,
        is_active=True
    )
    
    # Create inactive product
    inactive_product = Product.objects.create(
        category=category,
        name="Inactive Test Product",
        slug="inactive-test-product",
        price=10.00,
        is_active=False
    )
    
    # Create request with search query
    factory = RequestFactory()
    url = reverse('products:search')
    request = factory.get(url, {'q': 'Test Product'})
    
    # Get queryset from view
    view = ProductSearchView()
    view.request = request
    queryset = view.get_queryset()
    
    # Assert only active products are returned
    assert active_product in queryset
    assert inactive_product not in queryset
    assert queryset.count() == 1`,
    },
    {
      id: "test2",
      changeId: "change3",
      testType: "unit",
      framework: "pytest",
      description: "Test that product search uses select_related and prefetch_related",
      testCode: `import pytest
from django.urls import reverse
from django.test import RequestFactory
from django.db import connection, reset_queries
from django.test.utils import CaptureQueriesContext
from products.models import Product, Category, ProductImage
from products.views import ProductSearchView

@pytest.mark.django_db
def test_product_search_optimizes_queries():
    # Create test data
    category = Category.objects.create(name="Test Category", slug="test-category")
    
    # Create product with images
    product = Product.objects.create(
        category=category,
        name="Test Product",
        slug="test-product",
        price=10.00,
        is_active=True
    )
    
    # Add some product images
    ProductImage.objects.create(product=product, image="test1.jpg", alt_text="Test Image 1")
    ProductImage.objects.create(product=product, image="test2.jpg", alt_text="Test Image 2")
    
    # Create request with search query
    factory = RequestFactory()
    url = reverse('products:search')
    request = factory.get(url, {'q': 'Test Product'})
    
    # Get queryset from view and force evaluation
    view = ProductSearchView()
    view.request = request
    
    # Count queries when executing the queryset
    with CaptureQueriesContext(connection) as context:
        queryset = list(view.get_queryset())
        
        # Access related objects to verify they're prefetched
        for product in queryset:
            # This shouldn't trigger additional queries if prefetch_related works
            list(product.product_images.all())
            # This shouldn't trigger additional queries if select_related works
            category = product.category
    
    # We expect a small number of queries due to select_related and prefetch_related
    # Without optimization, this would be 1 + N queries (where N is the number of products)
    assert len(context.captured_queries) <= 3`,
    },
  ],

  // Cart session fix
  change15: [
    {
      id: "test3",
      changeId: "change15",
      testType: "unit",
      framework: "pytest",
      description: "Test cart initialization with empty session",
      testCode: `import pytest
from django.conf import settings
from django.http import HttpRequest
from django.contrib.sessions.middleware import SessionMiddleware
from cart.cart import Cart

def test_cart_initialization_with_empty_session():
    # Create a request with a session
    request = HttpRequest()
    middleware = SessionMiddleware(lambda req: None)
    middleware.process_request(request)
    request.session.save()
    
    # Initialize cart with empty session
    cart = Cart(request)
    
    # Check that cart was initialized properly
    assert cart.cart == {}
    assert settings.CART_SESSION_ID in request.session
    assert request.session[settings.CART_SESSION_ID] == {}`,
    },
    {
      id: "test4",
      changeId: "change15",
      testType: "unit",
      framework: "pytest",
      description: "Test session expiry extension for authenticated users",
      testCode: `import pytest
from django.conf import settings
from django.http import HttpRequest
from django.contrib.auth.models import User
from django.contrib.sessions.middleware import SessionMiddleware
from cart.cart import Cart

@pytest.mark.django_db
def test_session_expiry_extension_for_authenticated_users():
    # Create a user
    user = User.objects.create_user(username='testuser', password='testpass')
    
    # Create a request with a session
    request = HttpRequest()
    middleware = SessionMiddleware(lambda req: None)
    middleware.process_request(request)
    request.session.save()
    
    # Set user as authenticated
    request.user = user
    
    # Initialize cart
    cart = Cart(request)
    
    # Check that session expiry was set to SESSION_COOKIE_AGE
    assert request.session.get_expiry_age() == settings.SESSION_COOKIE_AGE`,
    },
  ],

  // Inventory form
  change31: [
    {
      id: "test5",
      changeId: "change31",
      testType: "unit",
      framework: "pytest",
      description: "Test inventory adjustment form validation for negative quantities",
      testCode: `import pytest
from django.test import TestCase
from products.models import Product, Category, ProductVariant
from inventory.forms import InventoryAdjustmentForm
from inventory.models import InventoryAdjustment

@pytest.mark.django_db
class TestInventoryAdjustmentForm(TestCase):
    def setUp(self):
        # Create test data
        self.category = Category.objects.create(name="Test Category", slug="test-category")
        self.product = Product.objects.create(
            category=self.category,
            name="Test Product",
            slug="test-product",
            price=10.00
        )
        self.variant = ProductVariant.objects.create(
            product=self.product,
            sku="TEST-SKU-001",
            price=10.00,
            stock=10
        )
    
    def test_negative_quantity_validation_for_add_adjustment(self):
        # Test that negative quantities are not allowed for 'add' adjustment type
        form_data = {
            'variant': self.variant.id,
            'adjustment_type': 'add',
            'quantity': -5,
            'reason': 'Test adjustment'
        }
        
        form = InventoryAdjustmentForm(data=form_data)
        
        # Form should not be valid
        self.assertFalse(form.is_valid())
        
        # Check for the specific error message
        self.assertIn('quantity', form.errors)
        self.assertEqual(
            form.errors['quantity'][0],
            'Quantity must be positive for adding or removing stock.'
        )`,
    },
    {
      id: "test6",
      changeId: "change31",
      testType: "unit",
      framework: "pytest",
      description: "Test inventory adjustment form validation for removing more than available",
      testCode: `import pytest
from django.test import TestCase
from products.models import Product, Category, ProductVariant
from inventory.forms import InventoryAdjustmentForm
from inventory.models import InventoryAdjustment

@pytest.mark.django_db
class TestInventoryAdjustmentForm(TestCase):
    def setUp(self):
        # Create test data
        self.category = Category.objects.create(name="Test Category", slug="test-category")
        self.product = Product.objects.create(
            category=self.category,
            name="Test Product",
            slug="test-product",
            price=10.00
        )
        self.variant = ProductVariant.objects.create(
            product=self.product,
            sku="TEST-SKU-001",
            price=10.00,
            stock=10
        )
    
    def test_remove_more_than_available_validation(self):
        # Test that removing more than available stock is not allowed
        form_data = {
            'variant': self.variant.id,
            'adjustment_type': 'remove',
            'quantity': 15,  # More than the 10 in stock
            'reason': 'Test adjustment'
        }
        
        form = InventoryAdjustmentForm(data=form_data)
        
        # Form should not be valid
        self.assertFalse(form.is_valid())
        
        # Check for the specific error message
        self.assertIn('quantity', form.errors)
        self.assertEqual(
            form.errors['quantity'][0],
            'Cannot remove 15 units. Only 10 in stock.'
        )`,
    },
  ],
}

// Helper function to get unit tests for a file change
export function getUnitTestsForChange(changeId: string): UnitTest[] {
  return mockUnitTests[changeId] || []
}

