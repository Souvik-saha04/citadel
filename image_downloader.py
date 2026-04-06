import os
import json
from icrawler.builtin import BingImageCrawler

# Create images folder
os.makedirs("images", exist_ok=True)

# Load JSON file
with open("products.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Loop through products
for item in data:
    product_name = item.get("name", "unknown")
    safe_name = product_name.replace(" ", "_").lower()

    print(f"Downloading image for {product_name}...")

    try:
        crawler = BingImageCrawler(
            storage={'root_dir': f'images/{safe_name}'}
        )

        crawler.crawl(
            keyword=product_name + "specific item image",
            max_num=1
        )

        print(f"✅ Downloaded image for {product_name}")

    except Exception as e:
        print(f"❌ Error with {product_name}: {e}")

print("🎉 All images downloaded!")