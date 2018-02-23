import React from 'react'
import { getDisplayName } from './'

function hocForm (WrappedComponent) {
  class HocForm extends React.Component {
    static displayName = `HocForm(${getDisplayName(WrappedComponent)})`

    state = {
      fields: {},
    }

    setField (fieldName, params = { initialValue: '' }) {
      if (!this.state.fields[fieldName]) {
        this.state.fields[fieldName] = {
          value: params.initialValue,
          onChange: (event) => {
            this.state.fields[fieldName].value = event.target.value
            this.forceUpdate()
          },
        }
      }

      return {
        value: this.state.fields[fieldName].value,
        onChange: this.state.fields[fieldName].onChange,
      }
    }

    getFields (fieldName) {
      if (fieldName) {
        return {
          [fieldName]: this.state.fields[fieldName] && this.state.fields[fieldName].value,
        }
      }
      const values = {}
      for (let field in this.state.fields) {
        if (Object.prototype.hasOwnProperty.call(this.state.fields, field)) {
          values[field] = this.state.fields[field].value
        }
      }
      return values
    }

    render () {
      const props = {
        ...this.props,
        fields: ::this.setField,
        getFields: ::this.getFields,
      }
      return (
        <div>
          <h3>HOC Form Component</h3>
          <WrappedComponent {...props} />
        </div>
      )
    }
    }

  return HocForm
}

export default hocForm
