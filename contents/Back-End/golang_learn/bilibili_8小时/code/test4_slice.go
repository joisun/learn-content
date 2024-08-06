package main

import "fmt"

func main() {
    var numbers = make([]int, 3) 

    fmt.Printf("len = %d, cap = %d, slice = %v\n", len(numbers), cap(numbers), numbers)
    
    numbers = append(numbers, 4)

    fmt.Printf("len = %d, cap = %d, slice = %v\n", len(numbers), cap(numbers), numbers)
    

    numbers = append(numbers, 5)
    numbers = append(numbers, 6)
    numbers = append(numbers, 7)


    fmt.Printf("len = %d, cap = %d, slice = %v\n", len(numbers), cap(numbers), numbers)
}
