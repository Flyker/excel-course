import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
      name: 'table',
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      console.log('Start resizing...', event.target.dataset.resize)
    }
  }
}
