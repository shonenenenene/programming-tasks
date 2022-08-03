function showMeTheTable(num) {
    if (typeof num !== 'number') {
        return console.log('Будте добры, введите число')
    }
    if ( num > 99 || num < 1 ) {
        return console.log(
            'Прошу меня извинить, но я принимаю только числа в диапазоне от 1 до 99 включительно'
        )
    }

    const headerMultipliers = Array.from({ length: num }, (e, i) => i + 1) // Создаем массив множителей в заголовке

    let сolumnMultiplier = headerMultipliers[0] // Сюда будут записываться значения множителей левой колонки
    // Создание массива, включающего в себя множитель из левой  колонки и произведения множителей в текущей линии
    function tableProductsLineGenerator() {
        const arr = Array.from(
            { length: headerMultipliers.length + 1 },
            (e, i) =>
                i !== 0 ? i * сolumnMultiplier : (e = сolumnMultiplier + '|')
        )
        сolumnMultiplier++
        return arr
    }
    // Создание массива со всеми значениями будущей таблицы
    const rawArr = Array.from({ length: num + 2 }, (e, i) =>
        i === 0
            ? (e = ['  '].concat(headerMultipliers))
            : i === 1
            ? (e = ['---'])
            : tableProductsLineGenerator()
    )

    let indexOfTwoDigit = // Фиксируем индекс элементов, начиная с которых будет происходить выравнивание
        rawArr[rawArr.length - 1] // Определяем индекс по будущей последней строке таблицы
            .slice(1)
            .findIndex((e) => String(e).length === 2) + 1
    if (num < 4) indexOfTwoDigit = num + 1
    let indexOfThreeDigit =
        rawArr[rawArr.length - 1]
            .slice(1)
            .findIndex((e) => String(e).length === 3) + 1
    if (num < 10) indexOfThreeDigit = num + 1
    let indexOfFourDigit =
        rawArr[rawArr.length - 1]
            .slice(1)
            .findIndex((e) => String(e).length === 4) + 1
    if (num < 32) indexOfFourDigit = num + 1
    // Выравниваем все элементы путем внедрения пробелов и соединяем
    const alignedArr = rawArr.map((e, i) => {
        if (i === 1) {
            return '-'.repeat(rawArr[rawArr.length - 1].toString().length)
        } else {
            let alignedLine = e.map((element, index) => {
                if (num > 9 && index === 0 && String(element).length === 2) {
                    return ' ' + element
                } else if (
                    num > 9 &&
                    index === 0 &&
                    String(element).length === 3
                ) {
                    return element
                }

                if (index >= indexOfFourDigit && String(element).length === 2) {
                    return '  ' + element
                } else if (
                    index >= indexOfFourDigit &&
                    String(element).length === 3
                ) {
                    return ' ' + element
                } else if (
                    index >= indexOfThreeDigit &&
                    String(element).length === 1
                ) {
                    return '  ' + element
                } else if (
                    index >= indexOfTwoDigit &&
                    String(element).length === 1
                ) {
                    return ' ' + element
                } else if (
                    index >= indexOfThreeDigit &&
                    String(element).length === 2
                ) {
                    return ' ' + element
                } else return element
            })

            return alignedLine.join(' ')
        }
    })

    const doneTable = alignedArr.join('\n')

    console.log(doneTable)
}

showMeTheTable(35)
