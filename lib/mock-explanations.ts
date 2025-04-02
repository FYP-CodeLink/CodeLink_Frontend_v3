import { mockFileChanges } from "./mock-data"

// Types for feature explanations
export type FeatureExplanation = {
  shortDescription: string
  featureContext: string
  technicalDetails: string
  impact: string
  relatedChanges?: string[]
}

// Mock explanations for each file change
export const mockExplanations: Record<string, FeatureExplanation> = {
  // Main branch - README update
  change1: {
    shortDescription: "Enhanced deployment documentation for PyShop",
    featureContext: "Documentation",
    technicalDetails:
      "This change updates the README.md file to provide more comprehensive deployment instructions for the PyShop eCommerce platform. It adds detailed prerequisites including Python and database requirements, and step-by-step deployment instructions for production environments.",
    impact:
      "Improves the developer experience by providing clear deployment guidelines, reducing setup time and potential configuration errors when deploying to production environments.",
    relatedChanges: ["change2"],
  },
  change2: {
    shortDescription: "Added Nginx configuration for production deployment",
    featureContext: "DevOps",
    technicalDetails:
      "This change adds a new Nginx configuration file that defines server settings for the PyShop application. It includes static file handling, media file serving, and proxy settings to the Gunicorn application server.",
    impact:
      "Enables developers to quickly set up a production-ready web server configuration, ensuring optimal performance and security for the PyShop application.",
    relatedChanges: ["change1"],
  },

  // Product search pagination fix
  change3: {
    shortDescription: "Fixed product search pagination with optimized database queries",
    featureContext: "Performance Optimization",
    technicalDetails:
      "This change improves the ProductSearchView by adding filters for active products and implementing database optimization techniques like select_related and prefetch_related to reduce the number of database queries when paginating search results.",
    impact:
      "Significantly improves search performance and reduces server load by optimizing database access patterns, especially for large product catalogs with many related objects.",
    relatedChanges: ["change4"],
  },
  change4: {
    shortDescription: "Added pagination controls to search results template",
    featureContext: "User Interface",
    technicalDetails:
      "This change adds pagination navigation controls to the search results template, including previous and next page links that maintain the search query parameter across page navigation.",
    impact:
      "Improves user experience by allowing customers to navigate through multiple pages of search results while maintaining their search context.",
    relatedChanges: ["change3"],
  },

  // Initial project structure
  change5: {
    shortDescription: "Created Django management script for PyShop",
    featureContext: "Project Setup",
    technicalDetails:
      "This change adds the standard Django manage.py script that serves as the command-line utility for administrative tasks in the PyShop project. It configures the default settings module and provides error handling for common setup issues.",
    impact:
      "Establishes the foundation for project management, enabling developers to run commands for migrations, server startup, and other administrative tasks.",
  },
  change6: {
    shortDescription: "Configured Django settings for PyShop application",
    featureContext: "Project Setup",
    technicalDetails:
      "This change creates the main settings.py file for the PyShop project, configuring essential Django settings including installed apps, middleware, database connection, authentication, static files, and cart session handling.",
    impact:
      "Establishes the core configuration for the entire application, defining how the different components interact and setting up the development environment.",
  },
  change7: {
    shortDescription: "Created product data models with category relationships",
    featureContext: "Data Modeling",
    technicalDetails:
      "This change defines the core data models for the product catalog, including Category, Product, and ProductImage models with appropriate relationships, fields, and metadata. It implements slug generation for SEO-friendly URLs and absolute URL methods for navigation.",
    impact:
      "Establishes the foundation for the product catalog, enabling the storage and retrieval of product information with proper categorization and image support.",
  },

  // Payment gateway implementation
  change8: {
    shortDescription: "Implemented Stripe webhook handler for payment processing",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change adds a webhook handler for Stripe payment events, processing payment intents for both successful and failed payments. It includes signature verification for security and updates order statuses based on payment outcomes.",
    impact:
      "Enables asynchronous payment processing, ensuring that orders are properly updated even if customers close their browser during checkout, improving payment reliability and order tracking.",
    relatedChanges: ["change9", "change10"],
  },
  change9: {
    shortDescription: "Added payment endpoint to URL configuration",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change updates the main URL configuration to include payment-related URLs, connecting the payment processing views and webhook handlers to their respective endpoints.",
    impact:
      "Integrates the payment system into the application's URL structure, making payment processing endpoints accessible to both users and Stripe's webhook service.",
    relatedChanges: ["change8", "change10"],
  },
  change10: {
    shortDescription: "Created URL routing for payment processing",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change defines the URL patterns for the payment application, including routes for payment processing and webhook handling with appropriate naming for reverse URL lookups.",
    impact:
      "Establishes the routing structure for payment-related functionality, enabling clean URL paths for payment processing and webhook endpoints.",
    relatedChanges: ["change8", "change9"],
  },

  // Stripe payment implementation
  change11: {
    shortDescription: "Implemented Stripe payment processing view",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change adds a view for processing payments using Stripe, creating payment intents and handling both successful and failed payment attempts. It includes error handling for Stripe API interactions and renders appropriate templates for the payment flow.",
    impact:
      "Enables secure online payment processing, allowing customers to complete purchases using credit cards through the Stripe payment gateway.",
    relatedChanges: ["change12"],
  },
  change12: {
    shortDescription: "Created payment processing template with Stripe Elements",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change adds a template for the payment processing page that integrates Stripe Elements for secure credit card input. It includes JavaScript for handling the payment submission process and error display.",
    impact:
      "Provides a secure, user-friendly interface for entering payment information, with real-time validation and error handling to guide customers through the checkout process.",
    relatedChanges: ["change11"],
  },

  // Payment models
  change13: {
    shortDescription: "Created payment data model for transaction tracking",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change defines the Payment model for tracking payment transactions, including relationships to orders, payment status tracking, and metadata for Stripe payment IDs.",
    impact:
      "Enables comprehensive tracking of payment transactions, providing a record of all payment attempts and their outcomes for order fulfillment and financial reconciliation.",
    relatedChanges: ["change14"],
  },
  change14: {
    shortDescription: "Added Stripe configuration to application settings",
    featureContext: "Payment Processing",
    technicalDetails:
      "This change updates the Django settings to include Stripe API keys and configuration options, making them available throughout the application for payment processing.",
    impact:
      "Centralizes payment gateway configuration, making it easy to manage API keys and other Stripe-related settings across different environments.",
    relatedChanges: ["change13"],
  },

  // Cart session fixes
  change15: {
    shortDescription: "Fixed cart session handling to prevent expiration issues",
    featureContext: "Shopping Cart",
    technicalDetails:
      "This change improves the Cart class implementation to handle session initialization more robustly, extend session expiry for authenticated users, and ensure proper session modification flags are set to prevent data loss.",
    impact:
      "Resolves issues with cart data being lost due to session expiration, improving the shopping experience by maintaining cart contents reliably across user sessions.",
    relatedChanges: ["change16"],
  },
  change16: {
    shortDescription: "Enhanced cart views with session expiry management",
    featureContext: "Shopping Cart",
    technicalDetails:
      "This change updates the cart view functions to explicitly manage session expiry and handle cases where the cart session has expired, providing appropriate user feedback and recovery mechanisms.",
    impact:
      "Improves user experience by gracefully handling session expiration scenarios and providing clear feedback when cart data needs to be recreated.",
    relatedChanges: ["change15"],
  },

  // Session logging
  change17: {
    shortDescription: "Added cart session middleware for debugging",
    featureContext: "Debugging",
    technicalDetails:
      "This change implements a middleware component that logs cart session activity, capturing session keys, cart existence, and authentication status before and after each request processing.",
    impact:
      "Enables detailed debugging of cart session issues by providing comprehensive logging of session state throughout the request lifecycle.",
    relatedChanges: ["change18"],
  },
  change18: {
    shortDescription: "Configured session and logging settings",
    featureContext: "System Configuration",
    technicalDetails:
      "This change updates the Django settings to configure session handling parameters and implement a structured logging system with console and file outputs for cart-related activities.",
    impact:
      "Improves system reliability by optimizing session handling parameters and enables effective troubleshooting through comprehensive logging of cart operations.",
    relatedChanges: ["change17"],
  },

  // User reviews - star rating
  change19: {
    shortDescription: "Created star rating component for product reviews",
    featureContext: "User Reviews",
    technicalDetails:
      "This change adds a reusable star rating component template that visualizes ratings with filled, half-filled, or empty stars. It includes styling and accessibility attributes for proper screen reader support.",
    impact:
      "Enhances the product detail pages with visual rating indicators, making it easier for customers to quickly assess product quality based on other users' reviews.",
    relatedChanges: ["change20", "change21"],
  },
  change20: {
    shortDescription: "Implemented interactive star rating input for review submission",
    featureContext: "User Reviews",
    technicalDetails:
      "This change adds JavaScript functionality for an interactive star rating input component, allowing users to hover over and click stars to select their rating when submitting product reviews.",
    impact:
      "Provides an intuitive, user-friendly interface for submitting ratings, improving the review submission experience and encouraging more customer feedback.",
    relatedChanges: ["change19", "change21"],
  },
  change21: {
    shortDescription: "Integrated review system into product detail page",
    featureContext: "User Reviews",
    technicalDetails:
      "This change updates the product detail template to display the average rating for products and include the review submission form and review listing components.",
    impact:
      "Creates a complete review experience on product pages, allowing customers to both read existing reviews and submit their own feedback in the same interface.",
    relatedChanges: ["change19", "change20"],
  },

  // Review moderation
  change22: {
    shortDescription: "Implemented review moderation in admin interface",
    featureContext: "Content Moderation",
    technicalDetails:
      "This change creates an admin interface for managing product reviews, including list displays, filtering options, and admin actions for approving or unapproving reviews.",
    impact:
      "Enables store administrators to effectively moderate user-generated content, maintaining content quality and preventing inappropriate or spam reviews from appearing on the site.",
    relatedChanges: ["change23"],
  },
  change23: {
    shortDescription: "Created review submission and moderation workflow",
    featureContext: "User Reviews",
    technicalDetails:
      "This change implements the view logic for submitting and editing product reviews, including authentication requirements, duplicate review prevention, and conditional moderation based on system settings.",
    impact:
      "Establishes a complete review submission workflow with appropriate validation, user feedback, and moderation capabilities to maintain review quality.",
    relatedChanges: ["change22"],
  },

  // Review models
  change24: {
    shortDescription: "Created review data model with product rating calculation",
    featureContext: "User Reviews",
    technicalDetails:
      "This change defines the Review model for storing user reviews and ratings, and extends the Product model with a method to calculate average ratings from approved reviews.",
    impact:
      "Establishes the data structure for the review system and enables products to display aggregate ratings based on customer feedback.",
    relatedChanges: ["change25", "change26"],
  },
  change25: {
    shortDescription: "Implemented review submission form",
    featureContext: "User Reviews",
    technicalDetails:
      "This change creates a form for submitting product reviews, with fields for rating and comments, and appropriate widgets and validation for the user interface.",
    impact:
      "Provides a structured way for users to submit reviews with consistent data validation, improving data quality and user experience.",
    relatedChanges: ["change24", "change26"],
  },
  change26: {
    shortDescription: "Added reviews application to project settings",
    featureContext: "User Reviews",
    technicalDetails:
      "This change updates the Django settings to include the reviews application in the list of installed apps, making its models, templates, and other components available to the project.",
    impact:
      "Integrates the review system into the main application, enabling its features to be used throughout the eCommerce platform.",
    relatedChanges: ["change24", "change25"],
  },

  // Inventory tracking
  change27: {
    shortDescription: "Implemented product variants with inventory tracking",
    featureContext: "Inventory Management",
    technicalDetails:
      "This change extends the product model to support variants (like different sizes or colors) with individual SKUs, prices, and stock levels. It includes methods for calculating total stock and checking availability across variants.",
    impact:
      "Enables more sophisticated product offerings with variant-specific inventory tracking, allowing the store to sell products with different options while maintaining accurate stock levels.",
    relatedChanges: ["change28"],
  },
  change28: {
    shortDescription: "Enhanced admin interface for variant inventory management",
    featureContext: "Inventory Management",
    technicalDetails:
      "This change updates the admin interface to support the new product variant model, with inline editing capabilities, list displays, and custom methods for showing variant-specific information.",
    impact:
      "Provides store administrators with efficient tools for managing product variants and their inventory levels directly in the Django admin interface.",
    relatedChanges: ["change27"],
  },

  // Low stock notifications
  change29: {
    shortDescription: "Created inventory alert and adjustment tracking models",
    featureContext: "Inventory Management",
    technicalDetails:
      "This change adds models for tracking stock alerts (low stock and out of stock conditions) and inventory adjustments (additions, removals, and corrections) with appropriate metadata and relationships.",
    impact:
      "Establishes a system for monitoring inventory levels and tracking all changes to stock quantities, providing accountability and historical data for inventory management.",
    relatedChanges: ["change30"],
  },
  change30: {
    shortDescription: "Implemented automatic stock level monitoring with alerts",
    featureContext: "Inventory Management",
    technicalDetails:
      "This change adds signal handlers that automatically create or update stock alerts when product variant stock levels change, with logic for different alert types and resolution tracking.",
    impact:
      "Automates inventory monitoring, ensuring that store administrators are promptly notified of low stock or out-of-stock conditions without manual checking.",
    relatedChanges: ["change29", "change31"],
  },
  change31: {
    shortDescription: "Created inventory management admin interface",
    featureContext: "Inventory Management",
    technicalDetails:
      "This change implements admin interfaces for stock alerts and inventory adjustments, with color-coded stock level indicators, custom actions for alert resolution, and a specialized form for making inventory adjustments.",
    impact:
      "Provides store administrators with comprehensive tools for monitoring inventory levels, resolving alerts, and making stock adjustments with proper tracking and validation.",
    relatedChanges: ["change29", "change30"],
  },
}

// Helper function to get explanation for a file change
export function getExplanationForChange(changeId: string): FeatureExplanation | null {
  return mockExplanations[changeId] || null
}

// Helper function to get all explanations for a commit
export function getExplanationsForCommit(commitId: string): FeatureExplanation[] {
  const changes = mockFileChanges[commitId] || []
  return changes.map((change) => mockExplanations[change.id]).filter(Boolean) as FeatureExplanation[]
}

