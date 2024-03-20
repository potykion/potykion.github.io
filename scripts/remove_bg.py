from rembg import remove

input_path = r'0_0_orig.webp'
output_path = '../static/images/beer/st-bernardus-tripel.png'

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input = i.read()
        output = remove(input)
        o.write(output)