import os
import csv
from icrawler.builtin import BingImageCrawler

os.makedirs("images", exist_ok=True)

with open("products.csv", newline='', encoding='utf-8') as file:
    reader = csv.DictReader(file)

    for row in reader:
        product_name = row['name']
        safe_name = product_name.replace(" ", "_").lower()

        print(f"Downloading image for {product_name}...")

        try:
            crawler = BingImageCrawler(storage={'root_dir': f'images'})
            crawler.crawl(
                keyword=product_name + " raw and fresh food",
                max_num=1
            )

            print(f"✅ Download attempted for {product_name}")

        except Exception as e:
            print(f"❌ Error with {product_name}: {e}")

print("🎉 All images download attempted!")