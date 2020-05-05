document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.contenteditable-checkboxes').forEach($el => {

    // Create a wrapping container
    const $wrap = document.createElement('div')
    $el.appendChild($wrap)
    $wrap.classList.add('contenteditable-checkboxes-wrap')

    // Create the contenteditable area
    const $editable = document.createElement('div')
    $wrap.appendChild($editable)
    $wrap.classList.add('contenteditable-checkboxes-content')
    $editable.setAttribute('contenteditable', true)
    $editable.focus()
  })
})