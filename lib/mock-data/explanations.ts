import type { FeatureExplanation } from "@/lib/types"

// Mock explanations for each file change
export const mockExplanations: Record<string, FeatureExplanation> = {
  // First commit in first branch (main)
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

  // Second commit in second branch (feature/payment-gateway)
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
}

