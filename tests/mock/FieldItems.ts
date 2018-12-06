import { JSDOM } from 'jsdom'

const { document } = (new JSDOM('<!DOCTYPE html><html></html>')).window

const items =
[
  { name: 'fullName'
  , scope: 'formOne'
  , rules: [ 'required' ]
  , value: ''
  , el: document.createElement('input')
  , vm: undefined
  }
  ,
  { name: 'birthday'
  , scope: 'formOne'
  , rules: { required: true, dateFormat: 'DD/MM/YYYY' }
  , value: ''
  , el: document.createElement('input')
  , vm: undefined
  }
  ,
  { name: 'fullName'
  , scope: 'formTwo'
  , rules: 'required'
  , value: ''
  , el: document.createElement('input')
  , vm: undefined
  }
  ,
  { name: 'birthday'
  , scope: 'formTwo'
  , rules: 'required|dateFormat'
  , value: ''
  , el: document.createElement('input')
  , vm: undefined
  }
  ,
  { name: 'gender'
  , scope: 'formTwo'
  , rules: 'required|numeric'
  , value: ''
  , el: document.createElement('input')
  , vm: undefined
  }
]

export const dummyField = (name?: string, scope?: string) =>
  ({ name: name || 'dummyField'
   , scope
   , value: ''
   , rules: ''
   , el: document.createElement
   , vm: undefined
  })

export default items