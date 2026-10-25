import os
import fitz # PyMuPDF

pdf_path = "d:/ModShine/Brown Minimalist Interior Design Portfolio Present_261024_164643.pdf"
output_dir = "d:/ModShine/extracted_assets"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# 1. Render each page as a crisp high-res image (300 DPI / zoom 2.0)
for page_num in range(len(doc)):
    page = doc[page_num]
    zoom = 2.0
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    page_img_path = os.path.join(output_dir, f"page_{page_num + 1}.jpg")
    pix.save(page_img_path)
    print(f"Saved page {page_num + 1} to {page_img_path}")

# 2. Extract embedded images
img_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        img_filename = f"img_p{page_num + 1}_{img_idx + 1}.{image_ext}"
        img_path = os.path.join(output_dir, img_filename)
        with open(img_path, "wb") as f:
            f.write(image_bytes)
        img_count += 1

print(f"Done! Extracted {img_count} raw images and {len(doc)} full-page renders.")
