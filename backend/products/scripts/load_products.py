import csv 
import cloudinary.uploader
from products.models import Product
import cloudinary
import os

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def run():
    with open("../products.csv", newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        products = []

        for row in reader:
            try:
                safe_name = row['name'].replace(" ", "_").lower()
                folder_path = f"../images/{safe_name}"

                if not os.path.exists(folder_path):
                    print(f"❌ Folder not found for {row['name']}")
                    continue

                files = os.listdir(folder_path)

                if not files:
                    print(f"❌ No image found for {row['name']}")
                    continue

                image_path = os.path.join(folder_path, files[0])

                print("Uploading:", image_path)

                upload_result = cloudinary.uploader.upload(image_path)
                public_id = upload_result['public_id']

                product = Product(
                    name=row['name'],
                    category=row['category'],
                    unit=row['unit'],
                    quantity=int(row['quantity']),
                    variant=row['variant'],
                    price_per_unit=row['price_per_unit'],
                    original_price=row['original_price'],
                    min_price=row['min_price'],
                    current_price=row['current_price'],
                    stock_quantity=int(row['stock_quantity']),
                    harvest_date=row['harvest_date'],
                    expiry=row['expiry'] or None,
                    description=row['description'],
                    image=public_id   
                )

                products.append(product)

                print(f"✅ Processed: {row['name']}")

            except Exception as e:
                print(f"❌ Error with {row['name']}: {e}")

        Product.objects.bulk_create(products)

    print("🎉 All products uploaded successfully!")