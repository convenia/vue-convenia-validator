import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

import fileValidator, { FileValidatorOpts } from '../utils/fileValidator'

const defaultArgs: FileValidatorOpts =
{ multiple: false
, accept: []
, sizeLimit: null
, sizeUnit: 'KB'
}

/**
 * @param {File|FileList} value - The file or Array of files (FileList)
 * @param {FileValidatorOpts} options - An object with FileValidatorOptions
 *
 * @author Erik Isidore
 */

const rule: ValidationRule = {
  validate: (value: File | FileList, options: FileValidatorOpts): boolean => {
    if (!value) return true

    const { multiple, accept, sizeLimit, sizeUnit } = { ...defaultArgs, ...options }

    if (multiple) return Array
      .from((value as FileList))
      .every((file: File) => fileValidator(file, accept, sizeLimit, sizeUnit))

    return fileValidator(value as File, accept, sizeLimit, sizeUnit)
  },
  message: 'Arquivo(s) inválido(s)'
}

RuleContainer.add('file', rule)
export default rule
