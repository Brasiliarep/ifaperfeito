import os
from PIL import Image, ImageOps, ImageFilter

def make_transparent(img_path):
    print(f"Processing {img_path}...")
    if not os.path.exists(img_path):
        print(f"Error: {img_path} does not exist.")
        return
        
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Check if the pixel is close to black
        # item is (R, G, B, A)
        r, g, b, a = item
        brightness = (r + g + b) / 3.0
        
        if brightness < 25:
            # Fully transparent for very dark pixels
            new_data.append((0, 0, 0, 0))
        elif brightness < 60:
            # Smooth transition/feathering for edge pixels
            factor = (brightness - 25) / (60 - 25)
            new_data.append((r, g, b, int(255 * factor)))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    
    # Optional: Crop transparent borders to keep it neat
    # Find bounding box of non-transparent pixels
    alpha = img.split()[-1]
    bbox = alpha.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Save as transparent PNG
    img.save(img_path, "PNG")
    print(f"Saved transparent image to {img_path}")

if __name__ == "__main__":
    make_transparent("c:/aPP iFA/novo/public/obi_real_closed.png")
    make_transparent("c:/aPP iFA/novo/public/obi_real_open_male.png")
    make_transparent("c:/aPP iFA/novo/public/obi_real_open_female.png")
