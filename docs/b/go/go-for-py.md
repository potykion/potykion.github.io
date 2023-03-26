---
title: Go для Python разраба
description: Как штуки из Python делаются в Go
tags:
  - go
---

# Go для Python разраба

|                                                | Python                    | Go                           |
|------------------------------------------------|---------------------------|------------------------------|
| Proj environment                               | `venv`                    | `GOPATH`                     |
| Teardown-code: e.g. file close after meth exec | `contextmanager.__exit__` | `defer`                      |
| List / dynamic-array                           | list                      | slice                        | 
| List init                                      | `l = [1, 2, 3]`           | `l := []int{1, 2, 3}`        |
| Code-Formatter                                 | `black`                   | `gofmt`                      |
| Dict                                           | dict                      | map                          |
| Dict init                                      | `d = {"a": 1}`            | `d = map[string]int{"a": 1}` |