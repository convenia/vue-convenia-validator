export default interface Field {
  name: string
  type: string
  label?: string
  placeholder?: string
  validation?: string | Array<string>
  mask?: string | Array<string>
  value: any
}
