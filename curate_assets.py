import os
import shutil
from PIL import Image

src_dir = "d:/ModShine/extracted_assets"
dest_frontend = "d:/ModShine/frontend/public/assets"
dest_backend = "d:/ModShine/backend/public/assets"

os.makedirs(dest_frontend, exist_ok=True)
os.makedirs(dest_backend, exist_ok=True)

# Copy full pages
for i in range(1, 13):
    f = f"page_{i}.jpg"
    src_f = os.path.join(src_dir, f)
    if os.path.exists(src_f):
        shutil.copy(src_f, os.path.join(dest_frontend, f))
        shutil.copy(src_f, os.path.join(dest_backend, f))

# Let's crop high quality sections from the high-res 2x rendered pages!
# Page dimensions are typically around 1920x1080 or 2000x1125 at 2x zoom: 3840x2160
def crop_and_save(page_file, box_pct, out_name):
    src_path = os.path.join(src_dir, page_file)
    if not os.path.exists(src_path):
        return
    img = Image.open(src_path)
    w, h = img.size
    # box_pct is (left%, top%, right%, bottom%)
    box = (int(box_pct[0] * w), int(box_pct[1] * h), int(box_pct[2] * w), int(box_pct[3] * h))
    cropped = img.crop(box)
    
    out_fe = os.path.join(dest_frontend, out_name)
    out_be = os.path.join(dest_backend, out_name)
    cropped.save(out_fe, quality=95)
    cropped.save(out_be, quality=95)
    print(f"Saved cropped {out_name} ({cropped.size})")

# 1. Hero living room from page 1
crop_and_save("page_1.jpg", (0.50, 0.05, 0.98, 0.88), "hero_living_room.jpg")

# 2. Kitchens from page 6
crop_and_save("page_6.jpg", (0.05, 0.17, 0.50, 0.71), "kitchen_island.jpg")
crop_and_save("page_6.jpg", (0.51, 0.17, 0.95, 0.71), "kitchen_parallel.jpg")

# 3. Wardrobes from page 8
crop_and_save("page_8.jpg", (0.05, 0.20, 0.34, 0.72), "wardrobe_white_marble.jpg")
crop_and_save("page_8.jpg", (0.35, 0.20, 0.66, 0.72), "wardrobe_sage_green.jpg")
crop_and_save("page_8.jpg", (0.67, 0.20, 0.96, 0.72), "wardrobe_warm_wood_arches.jpg")

# 4. Partitions from page 9
crop_and_save("page_9.jpg", (0.05, 0.08, 0.33, 0.67), "partition_display.jpg")
crop_and_save("page_9.jpg", (0.34, 0.08, 0.64, 0.67), "partition_wooden_slat.jpg")
crop_and_save("page_9.jpg", (0.65, 0.08, 0.95, 0.67), "partition_cnc_design.jpg")

# 5. Pooja Units from page 10
crop_and_save("page_10.jpg", (0.05, 0.08, 0.34, 0.72), "pooja_unit_mandir.jpg")
crop_and_save("page_10.jpg", (0.35, 0.08, 0.65, 0.72), "pooja_unit_backlit.jpg")
crop_and_save("page_10.jpg", (0.66, 0.08, 0.95, 0.72), "pooja_unit_feather_laser.jpg")

# 6. TV Units from page 11
crop_and_save("page_11.jpg", (0.05, 0.20, 0.34, 0.73), "tv_unit_fluted_marble.jpg")
crop_and_save("page_11.jpg", (0.35, 0.20, 0.64, 0.73), "tv_unit_ambient_gold.jpg")
crop_and_save("page_11.jpg", (0.65, 0.20, 0.95, 0.73), "tv_unit_luxury_console.jpg")

# 7. Bedroom from page 12
crop_and_save("page_12.jpg", (0.50, 0.02, 0.98, 0.88), "bedroom_twin_luxury.jpg")

# 8. Logo & brand mark from page 1
crop_and_save("page_1.jpg", (0.05, 0.04, 0.42, 0.38), "modshine_logo_header.jpg")

print("Asset curation finished successfully!")
