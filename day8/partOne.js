const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let treeArray = loadData(data)
  let numOfVisibleTrees = countVisibleTrees(treeArray)

  console.log(`There are ${numOfVisibleTrees} visible trees`)

});

const loadData = (data) => {
    return data.split(/\r?\n/).map(n => n.split(''))
}

const countVisibleTrees = (treeArray) => {
    let visibleTrees = 0
    const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length]

    for (let row = 0; row < numberOfRows; row++) {
        for (let col = 0; col < numberOfCols; col++) {
          visibleTrees += isVisible(treeArray,row, col)
        }
      }
    return visibleTrees;
}

const isBorder = (treeArray,row, col) => {
    const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length]
    return row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1
}

const isVisible = (treeArray,row, col) => {
    if (isBorder(treeArray,row, col)) return true

    const isValid = cellValue => cellValue < treeArray[row][col]
    const numberOfRows = treeArray.length

    const [rowValues, colValues] = [
        treeArray[row],
      Array.from({ length: numberOfRows }, (_, i) => treeArray[i][col]),
    ]

    return [
      rowValues.slice(0, col).every(isValid),
      rowValues.slice(col + 1).every(isValid),
      colValues.slice(0, row).every(isValid),
      colValues.slice(row + 1).every(isValid),
    ].some(Boolean)
  }