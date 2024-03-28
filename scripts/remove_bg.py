from rembg import remove

if __name__ == '__main__':

    input_path = r'1ae8ade0e5f0448ba89c72bfabfb32de.jpeg'
    output_path = '../static/images/food/kom-rang-bo.png'

    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)