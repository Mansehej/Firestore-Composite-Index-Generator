module.exports = {
    addBackticksToString(string) {
        return `\`${string}\``
    },
    combine(arrayToCombine) {
        var all = [];
        for (var i = 2; i < arrayToCombine.length; i++) {
            createCombinations(i, arrayToCombine, [], all);
        }
        all.push(arrayToCombine);
        return all;
    },
    parseFilePath(filePath) {
        var parsedFilePath = ''
        if (filePath == '') {
            parsedFilePath = ''
        }
        else if (filePath.charAt(0) == '/') {
            parsedFilePath = filePath.substring(1)
        }
        else {
            parsedFilePath = filePath + '/'
        }
        return parsedFilePath
    }
}

/**
 * Recursive function to create combinations from an array
 */
function createCombinations(n, sourceArray, got, all) {
    if (n == 0) {
        if (got.length > 0) {
            isRepeated = false
            keyMap = {}
            got.forEach(gotter => {
                if (keyMap[gotter[0]]) {
                    isRepeated = true
                }
                else {
                    keyMap[gotter[0]] = true;
                }
            })
            if (!isRepeated)
                all[all.length] = got;
        }
        return;
    }
    for (var j = 0; j < sourceArray.length; j++) {
        createCombinations(n - 1, sourceArray.slice(j + 1), got.concat([sourceArray[j]]), all);
    }
    return;
}