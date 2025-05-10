const arr = [3, 0, 6, 1, 5, 10, 4]


function test() {
    let maxH = 0;

    for (let h = 1; h < arr.length; h++) {
        let counter = 0

        for (let i = 0; i < arr.length; i++) {
            if (h <= arr[i]) counter++
        }

        if (counter < h) return maxH

        maxH = h
    }
}


console.log(test())