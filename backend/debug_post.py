import requests
import json

url = "http://localhost:8000/api/products"
payload = {
    "name": "Baggy Pent",
    "description": "",
    "price": 1900.0,
    "category": "men",
    "image": "https://www.shutterstock.com/search/baggy-pants",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Blue"],
    "inStock": True
}

try:
    print(f"Sending payload: {json.dumps(payload, indent=2)}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
