import ContenteditableCheckbox from './ContenteditableCheckbox'
window.contenteditableCheckboxInstances = []

/**
 * Instantiate one ContenteditableCheckbox for each target
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.contenteditable-checkboxes').forEach($el => {
    window.contenteditableCheckboxInstances.push(new ContenteditableCheckbox($el))
  })
})