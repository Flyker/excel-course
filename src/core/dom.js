class Dom {
  constructor(selector) {
    // Либо ищем по строке selector, либо присваиваем готовую ноду selector
    this.$el = typeof selector==='string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    // берем нативную ноду
    let innerNode = node
    if (node instanceof Dom) {
      innerNode = node.$el
    }
    // аппендим нативную ноду
    if (Element.prototype.append) {
      this.$el.append(innerNode)
    } else {
      this.$el.appendChild(innerNode)
    }
    // возвращаем для chain
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes='') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
