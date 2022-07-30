function showMeTheTable(num) {
    if (typeof num !== 'number') {
        return console.log('Будте добры, введите число')
    } else if (num > 9) {
        return console.log(
            'Прошу меня извинить, но я принимаю только числа меньше десяти'
        )
    }

    const headerMultipliers = Array.from({ length: num }, (e, i) => i + 1) // Создаем массив множителей в заголовке

    let сolumnMultiplier = headerMultipliers[0] // Сюда будут записываться значения множителей левой колонки
    const dashedLine = ['---'.repeat(num)]
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
            ? (e = headerMultipliers)
            : i === 1
            ? (e = dashedLine)
            : tableProductsLineGenerator()
    )

    let indexOfAlign = // Фиксируем индекс элементов, начиная с которых будет происходить выравнивание
        rawArr[rawArr.length - 1] // Определяем индекс по будущей последней строке таблицы
            .slice(1)
            .findIndex((e) => String(e).length === 2) + 1
    // Выравниваем все элементы путем внедрения пробелов и соединяем
    const alignedArr = rawArr.map((e, i) => {
        if (i < 1) {
            return ['  ']
                .concat(e)
                .map((element, index) => {
                    if (index >= indexOfAlign && String(element).length === 1) {
                        return ' ' + element
                    } else return element
                })
                .join(' ')
        } else if (i === 1) {
            return e
        } else {
            let alignedLine = e.map((element, index) => {
                if (index >= indexOfAlign && String(element).length === 1) {
                    return ' ' + element
                } else return element
            })
            return alignedLine.join(' ')
        }
    })

    const doneTable = alignedArr.join('\n')

    console.log(doneTable)
}

showMeTheTable(9)
