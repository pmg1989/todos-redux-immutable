import HocForm from './Hoc-form'
import HocDebug from './Hoc-debug'

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
  HocForm,
  HocDebug,
}
