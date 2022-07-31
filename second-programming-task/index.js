function arrayTransform(arr) {
    arr.sort((a, b) => a - b)

    let stringedArr = arr.map((e) => e.toString())
    let n = 0

    function finder(arr) {
        const arrayedArr = arr.map((e) => Array.from(e))
        console.log(arrayedArr)
        const arrFromFirstEl = arrayedArr[n]
        let indexesToDelete = new Set()
        arrayedArr.forEach((e, i) => {
            arrFromFirstEl.forEach((element, index) => {
                if (e.includes(element)) {
                    indexesToDelete.add(i)
                }
            })
        })
        console.log(indexesToDelete)
        if (indexesToDelete.size > 1) {
            arr = arr.filter((e, i) => ![...indexesToDelete].includes(i))
            console.log(arr)
            n = 0
            return finder(arr)
        } else {
            if (n === arr.length - 1) {
                console.log(arr)
                return arr
            }
            n++
            return finder(arr)
        }
    }

    finder(stringedArr)
}

console.log(arrayTransform([41, 55, 61, 1, 8, 27, 37, 39]))
