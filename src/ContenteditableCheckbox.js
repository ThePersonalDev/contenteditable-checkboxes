export default class ContenteditableCheckbox {
  /**
   * @param {*} $el 
   * @param {*} opts {withCheckbox: true} Creates the editable field with a checkbox already started
   */
  constructor ($el, opts = {}) {
    // Elements
    this.$ = {
      el: $el,
      group: document.createElement('div'),
      checkbox: document.createElement('div'),
      editable: document.createElement('div'),
      input: null
    }

    // Create a wrapping container
    $el.appendChild(this.$.group)
    this.$.group.classList.add('contenteditable-checkboxes-group')

    // Add the checkbox container
    this.$.checkbox.classList.add('contenteditable-checkboxes-checkbox-wrap')
    this.$.group.appendChild(this.$.checkbox)
    
    // Add the contenteditable area
    this.$.editable.classList.add('contenteditable-checkboxes-content')
    this.$.editable.setAttribute('contenteditable', true)
    this.$.group.appendChild(this.$.editable)
    this.$.editable.focus()

    this.bindEditor()

    // Handle options
    if (opts.withCheckbox) this.createCheckbox()
    
    window.contenteditableCheckboxInstances.push(this)
    return this
  }

    /**
   * Binds listeners to the editor
   * - Listens for a space press, and creates checkbox if it follows []
   * - Updates last value, if user backspaces and values are same then we know they backspaced from index 0
   */
  bindEditor () {
    this.$.editable.addEventListener('keyup', ev => {
      // Create checkbox
      if (ev.key === ' ' && this.$.editable.textContent.substring(0, 2) === '[]' && !this.$.input) {
        this.createCheckbox()
      }

      // Delete checkbox with backsapce
      if (ev.key === 'Backspace' && this.$.input && !this.getCaret()) {
        this.deleteCheckbox()
      }

      if (ev.key === 'Enter' && this.$.group.classList.contains('contenteditable-checkboxes-has-checkbox')) {
        // Delete checkbox with enter on empty row
        if (this.$.editable.textContent === '') {
          this.$.editable.textContent = ''
          this.deleteCheckbox()
        // Create new row
        } else {
          this.$.editable.textContent = this.$.editable.textContent.replace(/\n$/, "")
          this.createNewRow()          
        }
      } 
    })
  }

  /**
   * Adds a checkbox element
   * - Remvoes the [] from the contenteditable
   */
  createCheckbox () {
    this.$.input = document.createElement('input')
    this.$.input.setAttribute('type', 'checkbox')
    this.$.input.classList.add('contenteditable-checkboxes-checkbox-input')
    this.$.checkbox.appendChild(this.$.input)

    this.$.group.classList.add('contenteditable-checkboxes-has-checkbox')

    this.$.editable.textContent = this.$.editable.textContent.substring(3)
  }

  /**
   * Creates a new row with a checkbox
   */
  createNewRow () {
    new ContenteditableCheckbox(this.$.el, {withCheckbox: true})
  }

  /**
   * Deletes the checkbox
   */
  deleteCheckbox () {
    this.$.input.remove()
    this.$.input = null
    this.$.group.classList.remove('contenteditable-checkboxes-has-checkbox')
  }
  
  /**
   * Gets the caret position within the contenteditable
   * @see https://stackoverflow.com/a/4812022
   */
  getCaret () {
    let caretOffset = 0
    let doc = this.$.editable.ownerDocument || this.$.editable.document
    let win = doc.defaultView || doc.parentWindow
    let sel

    if (typeof win.getSelection != 'undefined') {
      sel = win.getSelection()
      if (sel.rangeCount > 0) {
        let range = win.getSelection().getRangeAt(0)
        let preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$.editable)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        caretOffset = preCaretRange.toString().length
      }
    } else if ( (sel = doc.selection) && sel.type != 'Control') {
      let textRange = sel.createRange()
      let preCaretTextRange = doc.body.createTextRange()
      preCaretTextRange.moveToElementText(this.$.editable)
      preCaretTextRange.setEndPoint('EndToEnd', textRange)
      caretOffset = preCaretTextRange.text.length
    }
    
    return caretOffset
  }
}