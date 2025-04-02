import type { UnitTest } from "@/lib/types"

// Mock unit tests for each file change
export const mockUnitTests: Record<string, UnitTest[]> = {
  // First commit in first branch (main)
  change1: [
    {
      id: "test1",
      changeId: "change1",
      testType: "unit",
      framework: "pytest",
      description: "Test README contains all required deployment sections",
      testCode: `import pytest
import os
import re

def test_readme_contains_deployment_sections():
   """Test that README.md contains all required deployment sections."""
   # Get the path to the README.md file
   readme_path = os.path.join(os.path.dirname(__file__), '..', 'README.md')
   
   # Read the README.md file
   with open(readme_path, 'r') as f:
       readme_content = f.read()
   
   # Check for required sections
   assert '## Deployment Instructions' in readme_content, "Missing Deployment Instructions section"
   assert '### Prerequisites' in readme_content, "Missing Prerequisites section"
   assert '### Production Deployment' in readme_content, "Missing Production Deployment section"
   
   # Check for specific requirements
   assert re.search(r'Python\\s+3\\.\\d+', readme_content), "Missing Python version requirement"
   assert re.search(r'PostgreSQL\\s+\\d+', readme_content), "Missing PostgreSQL requirement"
   assert 'Redis' in readme_content, "Missing Redis requirement"
   
   # Check for deployment steps
   assert 'environment variables' in readme_content.lower(), "Missing environment variables step"
   assert 'migrate' in readme_content, "Missing database migration step"
   assert 'collectstatic' in readme_content, "Missing static files step"
   assert 'Gunicorn' in readme_content, "Missing Gunicorn reference"
   assert 'Nginx' in readme_content, "Missing Nginx reference"`,
    },
  ],
  change2: [
    {
      id: "test2",
      changeId: "change2",
      testType: "unit",
      framework: "pytest",
      description: "Test Nginx configuration contains required settings",
      testCode: `import pytest
import os
import re

def test_nginx_config_contains_required_settings():
   """Test that nginx.conf contains all required settings."""
   # Get the path to the nginx.conf file
   nginx_path = os.path.join(os.path.dirname(__file__), '..', 'deployment', 'nginx.conf')
   
   # Read the nginx.conf file
   with open(nginx_path, 'r') as f:
       nginx_content = f.read()
   
   # Check for server block
   assert 'server {' in nginx_content, "Missing server block"
   
   # Check for listen directive
   assert re.search(r'listen\\s+\\d+', nginx_content), "Missing listen directive"
   
   # Check for server_name directive
   assert re.search(r'server_name\\s+\\w+', nginx_content), "Missing server_name directive"
   
   # Check for static files location
   assert re.search(r'location\\s+/static/', nginx_content), "Missing static files location"
   
   # Check for media files location
   assert re.search(r'location\\s+/media/', nginx_content), "Missing media files location"
   
   # Check for proxy settings
   assert 'proxy_pass' in nginx_content, "Missing proxy_pass directive"
   assert 'proxy_set_header Host' in nginx_content, "Missing Host header setting"
   assert 'proxy_set_header X-Real-IP' in nginx_content, "Missing X-Real-IP header setting"`,
    },
  ],
}

