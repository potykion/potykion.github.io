from rembg import remove

if __name__ == '__main__':

    input_path = r'600x800 (1).webp'
    output_path = '../static/images/wishlist/pozis.png'

    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)