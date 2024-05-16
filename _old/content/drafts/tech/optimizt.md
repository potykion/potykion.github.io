# [optimizt](https://github.com/343dev/optimizt)

- Node-CLI для сжатия картинок на базе [sharp](https://github.com/lovell/sharp)

## Установка

Базово так:

```sh
npm i -g @343dev/optimizt
```

Но [могут возникать проблемы](https://github.com/343dev/optimizt?tab=readme-ov-file#troubleshooting), и тогда надо так: 

```sh
npm -g uninstall @funboxteam/optimizt
npm config set ignore-scripts false
npm -g install @funboxteam/optimizt
```

## Юзадж

```sh
# one image optimization
optimizt path/to/picture.jpg

# list of images optimization losslessly
optimizt --lossless path/to/picture.jpg path/to/another/picture.png

# recursive AVIF creation in the passed directory
optimizt --avif path/to/directory

# recursive WebP creation in the passed directory
optimizt --webp path/to/directory

# recursive JPEG optimization in the current directory
find . -iname \*.jpg -exec optimizt {} +
```