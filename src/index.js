document.addEventListener('DOMContentLoaded', function () {
  /**
   * Binds listeners to the editor
   */
  const bindEditor = function ({$group, $editable, $checkbox}) {
    console.log($group, $editable, $checkbox)
  }

  /**
   * Create the contenteditable group
   */
  document.querySelectorAll('.contenteditable-checkboxes').forEach($el => {

    // Create a wrapping container
    const $group = document.createElement('div')
    $el.appendChild($group)
    $group.classList.add('contenteditable-checkboxes-group')

    // Add the checkbox container
    const $checkbox = document.createElement('div')
    $checkbox.classList.add('contenteditable-checkboxes-checkbox-wrap')
    $group.appendChild($checkbox)
    
    // Add the contenteditable area
    const $editable = document.createElement('div')
    $editable.classList.add('contenteditable-checkboxes-content')
    $editable.setAttribute('contenteditable', true)
    $group.appendChild($editable)
    $editable.focus()

    bindEditor({$group, $editable, $checkbox})
  })
})