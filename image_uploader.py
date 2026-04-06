import os
import json
import cloudinary
import cloudinary.uploader
""" load_dotenv()
CLOUDINARY_CLOUD_NAME=os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY=os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET=os.getenv("CLOUDINARY_API_SECRET") """

# Cloudinary config
cloudinary.config(
    cloud_name="dnsjnscsh",
    api_key="619242633492361",
    api_secret="EJxBX10864yA2mXRTtrE6NZaHxg"
)

# Load JSON
with open("products.json", "r", encoding="utf-8") as file:
    data = json.load(file)

for item in data:
    product_name = item.get("name", "unknown")
    safe_name = product_name.replace(" ", "_").lower()

    print(f"\n📤 Uploading {product_name}...")

    try:
        # Path to image
        folder_path = f'images/{safe_name}'
        
        # Get image file
        files = os.listdir(folder_path)
        if not files:
            print("❌ No image found")
            continue

        image_path = os.path.join(folder_path, files[0])

        # Upload to Cloudinary
        response = cloudinary.uploader.upload(
            image_path,
            public_id=f"products/{safe_name}",
            overwrite=True
        )

        image_url = response.get("secure_url")
        print(f"✅ Uploaded: {image_url}")

        # Save URL to JSON
        item["image_url"] = image_url

    except Exception as e:
        print(f"❌ Error with {product_name}: {e}")

# Save updated JSON
with open("products_with_images.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print("\n🎉 All images uploaded to Cloudinary!")