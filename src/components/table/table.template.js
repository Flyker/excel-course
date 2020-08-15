const CODES = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `
}

function toColumn(col) {
  const colResize = '<div class="col-resize" data-resize="col"></div>'
  return `
    <div class="column">${col}${colResize}</div>
  `
}

function createRow(index, content) {
  const rowHeaderContent = index ? index : ''
  const rowResize = index ?
    `<div class="row-resize" data-resize="row"></div>` :
    ''
  return `
    <div class="row">                
      <div class="row-info">${rowHeaderContent}${rowResize}</div>      
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i+1, cells))
  }

  return rows.join('')
}
