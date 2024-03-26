from rembg import remove

if __name__ == '__main__':

    input_path = r'st-bernardus-prior-8.webp'
    output_path = '../static/images/beer/st-bernardus-prior-8.webp'

    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)