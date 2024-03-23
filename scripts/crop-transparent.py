from pathlib import Path

from PIL import Image

# Open the image file
im = Image.open("bottle_05_Jaws_Marze.png")

# Calculate the bounding box of the non-transparent pixels
bbox = im.getbbox()

# Crop the image to the bounding box
im_cropped = im.crop(bbox)

path = r'C:\Users\GANSOR\PycharmProjects\potykion.github.io\static\images\beer'
path = Path(path).resolve()

# Save the cropped image
im_cropped.save(path / "jaws-marzen.png")
