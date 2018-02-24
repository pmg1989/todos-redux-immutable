import hocForm from './Hoc-form'
import hocDebug from './Hoc-debug'
import InputItem from './InputItem'

export function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function replacer (key, value) {
  if (typeof value === 'function') {
    return `function ${value.name}() {...}`
  }
  return value
}

export function stringify (value) {
  return JSON.stringify(value, replacer, 2)
}

export {
  hocForm,
  InputItem,
  hocDebug,
}
