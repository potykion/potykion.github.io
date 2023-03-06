---
 tags:
   - js
---

# Как скачать файл из запроса?

**Задача:** кинуть http-запрос, который отдает бинарный файл (напр. эксель), и скачать его в браузере

0. Кидаем запрос:

    ```js
    const resp = await fetch(...);
    ```

1. Нам нужен `Blob` и  `content-disposition`-хедер:

    ```js
    const contentDispositionHeader = resp.headers.get("content-disposition");
    const blob = await resp.blob();
    ```

2. Далее парсим хедер - достаем `filename`

    ```js
    function parseContentDisposition(disposition): string | undefined {
        if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                return matches[1].replace(/['"]/g, '');
            }
        }
    }
    
    const fileName = decodeURIComponent(parseContentDisposition(contentDispositionHeader));
    ```

3. И качаем `Blob` с названием `filename`, создавая `<a href download>`

    ```js
    const downloadBlob = (blob, fileName) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    downloadBlob(blob, fileName);
    
    ```

Полный код:

```js
function parseContentDisposition(disposition): string | undefined {
    if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, '');
        }
    }
}

const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const resp = await fetch(...);

const contentDispositionHeader = resp.headers.get("content-disposition");
const blob = await resp.blob();

const fileName = decodeURIComponent(parseContentDisposition(contentDispositionHeader));

downloadBlob(blob, fileName);
```