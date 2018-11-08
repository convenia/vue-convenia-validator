const validate = (value: any) => {
  if (Array.isArray(value)) return !!value.length
  if (typeof value === 'object') return !!Object.keys(value).length
  if (typeof value === 'string') return !!value.trim().length
  if (typeof value === 'number') return !!value

  return !!value
}

export default {
  validate,
  message: 'Campo obrigatório'
}