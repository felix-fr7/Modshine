import os
import shutil
from PIL import Image
import numpy as np

src_logo = "d:/ModShine/extracted_assets/Logo.jpeg"
dest_fe_assets = "d:/ModShine/frontend/public/assets"
dest_be_assets = "d:/ModShine/backend/public/assets"
dest_fe_public = "d:/ModShine/frontend/public"

os.makedirs(dest_fe_assets, exist_ok=True)
os.makedirs(dest_be_assets, exist_ok=True)

# 1. Copy original Logo.jpeg as Logo.jpg and Logo.jpeg
for dest in [dest_fe_assets, dest_be_assets, dest_fe_public]:
    shutil.copy(src_logo, os.path.join(dest, "Logo.jpg"))
    shutil.copy(src_logo, os.path.join(dest, "Logo.jpeg"))
    shutil.copy(src_logo, os.path.join(dest, "logo.jpg"))

print("Copied raw Logo.jpg to public directories.")

# 2. Check bounds and create an optimized cropped version
img = Image.open(src_logo).convert("RGBA")
arr = np.array(img)

# Non-black mask (where RGB sum is greater than 25)
mask = (arr[:, :, 0] > 25) | (arr[:, :, 1] > 25) | (arr[:, :, 2] > 25)
coords = np.argwhere(mask)
y0, x0 = coords.min(axis=0)
y1, x1 = coords.max(axis=0)
print(f"Original size: {img.size}, Non-black bounds: ({x0}, {y0}) to ({x1}, {y1})")

# Add a tiny 4% padding around the M
pad = int(max(x1 - x0, y1 - y0) * 0.05)
crop_x0 = max(0, x0 - pad)
crop_y0 = max(0, y0 - pad)
crop_x1 = min(img.width, x1 + pad)
crop_y1 = min(img.height, y1 + pad)

cropped_rgb = img.crop((crop_x0, crop_y0, crop_x1, crop_y1)).convert("RGB")
# Save square cropped version with sleek black frame
cropped_rgb.save(os.path.join(dest_fe_assets, "Logo_tight.jpg"), quality=95)
cropped_rgb.save(os.path.join(dest_fe_public, "Logo_tight.jpg"), quality=95)

# Also create transparent PNG version of the green emblem
arr_crop = np.array(img.crop((crop_x0, crop_y0, crop_x1, crop_y1)))
# Black pixels get 0 alpha, green pixels keep alpha
# Smooth alpha based on luminance
luminance = arr_crop[:, :, :3].mean(axis=2)
alpha = np.clip(luminance * 4.0, 0, 255).astype(np.uint8)
arr_crop[:, :, 3] = alpha
transparent_img = Image.fromarray(arr_crop)
transparent_img.save(os.path.join(dest_fe_assets, "Logo_transparent.png"))
transparent_img.save(os.path.join(dest_fe_public, "Logo_transparent.png"))

print("Logo processing completed successfully!")
