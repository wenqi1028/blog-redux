import '../styles/lib/modal.css'
(function() {
  // 构造函数不能用箭头函数写法
  const Modal = function(option = { title: '', content: '' }) {

    const header = buildHeader(option.type, option.title)
    
    const body = buildContent(option.type, option.content)

    const footer = buildFooter(option.type, option.url)

    this.modal = createElement('div', {
    class: 'modal fade in'
    }, '<div class="modal-dialog">\n<div class="modal-content">' + header + body + footer + '</div>\n</div>')

    this.backdrop = createElement('div', {
    class: 'modal-backdrop'
    })
  }
      
  Modal.prototype.show = function() {
    document.body.appendChild(this.modal)
    document.body.appendChild(this.backdrop)
    document.body.onclick = function (e) {
        if (!e.target.getAttribute('data-dismiss')) return;
        this.hide()   
    }.bind(this)
  }
  
  Modal.prototype.hide = function() { 
    if ([].indexOf.call(document.body.children, this.modal) > -1) { 
      document.body.removeChild(this.modal)
      document.body.removeChild(this.backdrop)
    }
  }
  
  document.onclick = (e) => {
    if (!e.target.getAttribute('data-type')) return;
    const attrs = e.target.attributes
    let i = attrs.length, opts = {}
    while (i--) {
        let name = attrs[i].name, 
            value = attrs[i].value
        if (name.match(/^data-/)) {
            // data-*键值对添加到opts中
            Object.assign(opts, { [formatName(name)]: value })
        }
    }
    const modal = new Modal(opts)
    modal.show()
  }
  
  const formatName = (name) => {
    return name.replace(/^data-/, '')
  }
  
  const createElement = (tag, attrs = {}, children = '') => {
    let el = document.createElement(tag)
    for (let n in attrs) {
    el.setAttribute(n, attrs[n])
    }
    el.innerHTML = children
    return el
  }
  
  const buildHeader = (type, title) => {
    let html
    switch(type) {
      case 'loading':
        html = '<h4 class="modal-title">' + title + '</h4>'
        break;
      default:
        html = '<button type="button" class="close" data-dismiss="modal" aria-label="Close">&times;</button><h4 class="modal-title">' + title + '</h4>'
    }
    return '<div class="modal-header">' + html + '</div>'
  }
  
  const buildContent = (type, content) => {
    let html
    switch(type) {
    case 'iframe':
      html = '<iframe id="modalIframe" src="' + content + '" frameborder="0" onload="" width="100%"></iframe>'
      break;
    case 'loading':
      html = '<div class="loading-icon"></div>'
      break;
    default:
      html = content
    }
    return '<div class="modal-body ' + type + '">' + html + '</div>'
  }
  
  const buildFooter = (type, url) => {
    let html
    switch(type) {
    case 'confirm':
      html = '<a href="' + url + '" class="btn btn-default" >确定</a>\n<a class="btn btn-default" data-dismiss="modal">取消</a>'
      break;
    case 'loading':
      return '';
    default:
      html = '<a class="btn btn-default" data-dismiss="modal">确定</a>'
    }
    return '<div class="modal-footer">' + html + '</div>'
  }
  
  if (typeof window !== 'undefined') {
    window.Modal = Modal
    // nodejs不支持window
  } else if (module && module.exports) {
    module.exports = Modal
  }
})()
  