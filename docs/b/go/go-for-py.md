---
title: Go для Python разраба
description: Как штуки из Python делаются в Go
tags:
  - go
hide:
  - toc
---

# Go для Python разраба

|                                                | Python                                                                 | Go                                                                 |
|------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------|
| Proj environment                               | `venv`                                                                 | `GOPATH`                                                           |
| Teardown-code: e.g. file close after meth exec | `contextmanager.__exit__`                                              | `defer`                                                            |
| List / dynamic-array                           | list                                                                   | slice                                                              | 
| List init                                      | `l = [1, 2, 3]`                                                        | `l := []int{1, 2, 3}`                                              |
| Code-Formatter                                 | `black`                                                                | `gofmt`                                                            |
| Dict                                           | dict                                                                   | map                                                                |
| Dict init                                      | `d = {"a": 1}`                                                         | `d = map[string]int{"a": 1}`                                       |
| str                                            | `'string' / "string"`                                                  | `"string"`                                                         |
| Public method                                  | `def method(...): ...`                                                 | `function Method(...) {...}`                                       | 
| Protected method                               | `def _method(...): ...`                                                | `function method(...) {...}`                                       |
| Dataclass                                      | <pre><code>@dataclass<br>class Album:<br>󠀠󠀠  title: str</code></pre> | <pre><code>type Album struct {<br>  Title string<br>}</pre></code> | 

<embed src="/b/go/go-cheat-sheet.pdf" type="application/pdf" width="800" height="1200">

[еще cheatsheet](https://github.com/a8m/golang-cheat-sheet)