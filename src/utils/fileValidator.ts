export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB'

export type FileValidatorOpts =
{ multiple: boolean
, accept: Array<string>
, sizeLimit: number | string | null
, sizeUnit: SizeUnit
}

const unitMultipliers: { [unit in SizeUnit]: number } =
{ 'B':  1
, 'KB': 1000
, 'MB': 1000000
, 'GB': 1000000000
}


/**
 * @param {File} value - The file
 * @param {Array<string>} multiple - Whether or not it is an Array of Files
 * @param {Array<string>} accept - The file types that are accepted
 * @param {Number|String} sizeLimit - Optional size limit for the file (s)
 * @param {SizeUnit} sizeUnit - Determines the unit used for the sizeLimit,
 * one of <'B', 'KB', 'MB' or 'GB'>
 *
 * @author Erik Isidore
 */

export default
( file: File
, accept: Array<string>
, sizeLimit: number | string | null
, sizeUnit: SizeUnit = 'KB'
): boolean => {

  const limitInBytes = sizeLimit && (+sizeLimit * unitMultipliers[sizeUnit]) || 0
  const fileExt = file.name
    .substring(file.name.lastIndexOf('.'))
    .toLowerCase()

  return sizeLimit != null
    ? accept.includes(fileExt) && file.size <= limitInBytes
    : accept.includes(fileExt)
}
