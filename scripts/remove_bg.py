from rembg import remove

if __name__ == '__main__':

    input_path = r'2112b66440ed9e5117be182c5dd64dbf_c_1367120008_raw.jpg'
    output_path = '../static/images/beer/siv-blueberry-and-blackberry-bochet.png'

    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)