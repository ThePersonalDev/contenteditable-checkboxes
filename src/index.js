document.addEventListener('DOMContentLoaded', function () {
  /**
   * Binds listeners to the editor
   * - Listens for a space press, and creates checkbox if it follows []
   */
  const bindEditor = function ({$group, $editable, $checkbox}) {
    $editable.addEventListener('keyup', ev => {
      if (ev.key === ' ' && $editable.textContent.substring(0, 2) == '[]' && !$group.classList.contains('contenteditable-checkboxes-has-checkbox')) {
        createCheckbox({$group, $editable, $checkbox})
      }
    })
  }

  /**
   * Adds a checkbox element
   * - Remvoes the [] from the contenteditable
   */
  const createCheckbox = function ({$group, $editable, $checkbox}) {
    const $input = document.createElement('input')
    $input.setAttribute('type', 'checkbox')
    $input.classList.add('contenteditable-checkboxes-checkbox-input')
    $checkbox.appendChild($input)

    $group.classList.add('contenteditable-checkboxes-has-checkbox')

    $editable.textContent = $editable.textContent.substring(3)
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