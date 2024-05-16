# PIL

## Bounding Box Crop / Обрезание png с прозрачным фоном

```python
from PIL import Image

im = Image.open(input_image_path)
bbox = im.getbbox()
im_cropped = im.crop(bbox)
im_cropped.save(output_image_path)
```