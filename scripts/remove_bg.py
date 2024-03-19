from rembg import remove

input_path = r'C:\Users\GANSOR\PycharmProjects\potykion.github.io\scripts\97ee860fb6697a0d3b70838fb303.jpg'
output_path = 'pilsner-urquell.png'

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input = i.read()
        output = remove(input)
        o.write(output)