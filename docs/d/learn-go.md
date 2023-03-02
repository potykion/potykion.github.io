---
tags:
  - go 
---

# Вкат в го

- https://devhints.io/go
- https://github.com/a8m/golang-cheat-sheet

---

- https://roadmap.sh/golang
- https://go.dev/doc/
- [A Tour of Go](https://go.dev/tour/welcome/1)
- https://gobyexample.com/
- https://www.w3schools.com/go/index.php

## [A Tour of Go](https://go.dev/tour/welcome/1)

- `gofmt` - стандартный форматтер кода, типа Black для Python

### Пакеты

- `package main` - входная точка в прогу
- `import "fmt"` - пакет с принтами: `fmt.Println("Hello, 世界")`

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
```

- `import "time"` - аналог `datetime` в пу: `time.Now()`

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Welcome to the playground!")

	fmt.Println("The time is", time.Now())
}
```

- Пакет импортируется как последнее слово - `math/rand > rand`
- `import "math/rand"` - рандом: `rand.Intn(10)`

```
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
```

- Все что экспортируется из других модулей должно начинаться с большой буквы: `math.pi > math.Pi`

### Функции

#### Определение

```go
func add(x int, y int) int {
	return x + y
}

// Можно писать тип один раз - тогда x, y будут интами
func add(x, y int) int {
	return x + y
}
```

#### Возврат тьюпла

```go
func swap(x, y string) (string, string) {
	return y, x
}
```

#### Именованый возврат ("naked" return)

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

### Операторы

Определение: `var i int = 1`

Множественное определение:

```go
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)
```

Присвоение без определения (inference): `a, b := swap("a", "b")`

### Типы

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32; represents a Unicode code point

float32 float64

complex64 complex128
```

### Control Flow

#### For

```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
```

Инит и инкремент можно убрать:

```go
sum := 1
for ; sum < 1000; {
    sum += sum
}
```

Можно убрать `;` - тогда будет `while`:

```go
sum := 1
for sum < 1000 {
    sum += sum
}
```

Можно убрать и условие, тогда будет вечный цикл:

```go
for {
}
```

#### if

```go
func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	} 
	return fmt.Sprint(math.Sqrt(x))
}
```

Можно определять переменные в `if` как в `for`:

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	
	// Тут v уже недоступно
	
	return lim
}
```

#### switch

```go
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("OS X.")
case "linux":
    fmt.Println("Linux.")
default:
    // freebsd, openbsd,
    // plan9, windows...
    fmt.Printf("%s.\n", os)
}
```

**Брейк писать не надо**

Можно писать выражения в `case` - типа pattern-matching:

```go
today := time.Now().Weekday()
switch time.Saturday {
case today + 0:
    fmt.Println("Today.")
case today + 1:
    fmt.Println("Tomorrow.")
case today + 2:
    fmt.Println("In two days.")
default:
    fmt.Println("Too far away.")
}
```

Можно в свиче не писать переменную, тогда будет иф-елс блок:

```go
switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
```

### defer

`defer` - выполняет функцию после вызова вызывающей функции - типа как в py context-manager код после yield:

```go
defer fmt.Println("world")
fmt.Println("hello")

// Выведет hello \n world
```

### Указатели

```go
i, j := 42, 2701

p := &i         // point to i
fmt.Println(*p) // read i through the pointer
*p = 21         // set i through the pointer
fmt.Println(i)  // see the new value of i

p = &j         // point to j
*p = *p / 37   // divide j through the pointer
fmt.Println(j) // see the new value of j
```

### struct

Типа NamedTuple в py:

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
```

### Массивы

```go
var a [2]string
a[0] = "Hello"
a[1] = "World"
fmt.Println(a[0], a[1])
fmt.Println(a)

primes := [6]int{2, 3, 5, 7, 11, 13}
fmt.Println(primes)


```

#### Слайсы

Слайсы - типа как в пу, но это скорее динамический массив

```go
// Есть слайсы как в py
// Но слайсы - это указатели!
var s []int = primes[1:4]

// Можно не указывать длину массива, но q - это уже не массив, а слайс-указатель
q := []int{2, 3, 5, 7, 11, 13}
```

- `len` - длина слайса 
- `cap` - вместимость слайса, типа слайс может быть пустым, но вмещать 4 элемента

```go
s := []int{2, 3, 5, 7, 11, 13}
printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

// Slice the slice to give it zero length.
s = s[:0]
printSlice(s) // len=0 cap=6 []

// Extend its length.
s = s[:4]
printSlice(s) // len=4 cap=6 [2 3 5 7]
```

##### make

```go
a := make([]int, 5) 
printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

b := make([]int, 0, 5) 
printSlice("b", b) // b len=0 cap=5 []
```

##### append

```go
var s []int
printSlice(s) // len=0 cap=0 []

// append works on nil slices.
s = append(s, 0)
printSlice(s) // len=1 cap=1 [0]

```

##### range

Типа как enumerate в py:

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
    // i - index
    // v - slice item
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v) // 2**0 = 1
	}
}
```

```go
pow := make([]int, 10)
// Итеграция только по индексам
for i := range pow {
    pow[i] = 1 << uint(i) // == 2**i
}
for _, value := range pow {
    fmt.Printf("%d\n", value)
}
```

### Maps / словари

```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

m["Answer"] = 42
fmt.Println("The value:", m["Answer"])

m["Answer"] = 48
fmt.Println("The value:", m["Answer"])

delete(m, "Answer")
fmt.Println("The value:", m["Answer"])

v, ok := m["Answer"]
fmt.Println("The value:", v, "Present?", ok)
```


https://go.dev/tour/methods/1