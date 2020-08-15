import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const isColumnResizing = ($resizer.data.resize === 'col')
  const sideProp = isColumnResizing ? 'bottom' : 'right'
  const antiSideProp = isColumnResizing ? 'right' : 'bottom'

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
    [antiSideProp]: '0px',
  })

  document.onmousemove = e => {
    e.preventDefault()
    if (isColumnResizing) {
      const delta = e.pageX - coords.right
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = (e) => {
    document.onmousemove = null
    document.onmouseup = null

    if (isColumnResizing) {
      const delta = e.pageX - coords.right
      let value = coords.width + delta
      if (value < 0) {
        value = 0
      }
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => el.style.width = value + 'px')
    } else {
      const delta = e.pageY - coords.bottom
      let value = coords.height + delta
      if (value < 0) {
        value = 0
      }
      $parent.css({height: value + 'px'})
    }
    //
    $resizer.css({ opacity: null, bottom: null, right: null })
  }
}
