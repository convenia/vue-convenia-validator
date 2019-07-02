export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB'

const unitMultipliers: { [unit in SizeUnit]: number } =
{ 'B':  1
, 'KB': 1000
, 'MB': 1000000
, 'GB': 1000000000
}

export default
( file: File
, accept: Array<string>
, sizeLimit: number | string
, sizeUnit: SizeUnit = 'KB'
): boolean => {

  const limitInBytes = (+sizeLimit * unitMultipliers[sizeUnit]) || 0
  const fileExt = file.name
    .substring(file.name.lastIndexOf('.'))
    .toLowerCase()


  return sizeLimit != null
    ? accept.includes(fileExt) && file.size <= limitInBytes
    : accept.includes(fileExt)
}
