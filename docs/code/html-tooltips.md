---
tags:
  - html
---

# Как делать тултипы?

Использовать атрибут `title`:

```html
<style>
    .dotted {
        border-bottom: dotted darkgray;
        cursor: help;
    }
</style>

И <span class="dotted" title="такие, сякие">другие</span>
```