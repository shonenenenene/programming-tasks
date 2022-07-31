function arrayTransformer(arr) {
    arr.sort((a, b) => a - b) // Сортировка массива в порядке возрастания

    let stringedArr = arr.map((e) => e.toString()) // Преобразование элементов массива в строки для удобства работы
    let n = 0 // Начальное значение индекса для поиска совпадений

    function arrayConverter(arr) {
        const arrayedArr = arr.map((e) => Array.from(e)) // Преобразование элементов массива в массивы символов для последовательного сравнения
        const firstElement = arrayedArr[n]
        let indexesToDelete = new Set() // Коллекция индексов повторяющихся значений
        arrayedArr.forEach((e, i) => {
            firstElement.forEach((element, index) => {
                if (e.includes(element)) {
                    indexesToDelete.add(i)
                }
            })
        })
        // Проверка, что в массиве есть элементы с повторяющимися цифрами
        if (indexesToDelete.size > 1) {
            arr = arr.filter((e, i) => ![...indexesToDelete].includes(i)) // Если есть, фильтруем их, затем обнуляем счетчик и прогоняем полученный массив снова
            n = 0
            return arrayConverter(arr)
            // Если повторяющихся цифр нет, берем следующий элемент и снова ищем совпадения
        } else {
            if (n === arr.length - 1) {
                // Выводим в консоль результат и возвращаем его если мы уже прошлись по всему массиву
                console.log(arr.map((e) => +e))
                return arr
            }
            n++
            return arrayConverter(arr)
        }
    }

    const semiFinalArr = arrayConverter(stringedArr)
    const reversedArr = semiFinalArr.map((e) =>
        Array.from(e).reverse().join('')
    )
    const powedArr = reversedArr.map((e) => Math.pow(+e, 2).toString())
    n = 0
    return arrayConverter(powedArr) // После реверса и возведения в квадрат снова прогоняем массив через функцию и получаем результат
}

arrayTransformer([41, 55, 61, 1, 8, 27, 37, 39])
