import React from 'react'

function HocForm (WrappedComponent) {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = { fields: {} }
    }

    getField (fieldName) {
      if (!this.state.fields[fieldName]) {
        this.state.fields[fieldName] = {
          value: '',
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
      const props = Object.assign({}, this.props, {
        fields: this.getField.bind(this),
        getFields: this.getFields.bind(this),
      })
      return (
        <WrappedComponent {...props} />
      )
    }
    }

//   PP.displayName = `PP(${getDisplayName(WrappedComponent)})`

  return PP
}

export default HocForm
