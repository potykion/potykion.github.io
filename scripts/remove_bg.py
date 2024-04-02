from rembg import remove

if __name__ == '__main__':

    input_path = r'C:\Users\admin\PycharmProjects\potykion.github.io\static\images\food\vv-sandwich.webp'
    output_path = r'C:\Users\admin\PycharmProjects\potykion.github.io\static\images\food\vv-sandwich2.webp'

    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)