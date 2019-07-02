import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

import fileValidator, { SizeUnit } from '../utils/fileValidator'

/**
 * @param {File|FileList} value - The file or Array of files (FileList)
 * @param {Array<string>} multiple - Whether or not it is an Array of Files
 * @param {Array<string>} accept - The file types that are accepted
 * @param {Number|String} sizeLimit - Optional size limit for the file (s)
 * @param {SizeUnit} sizeUnit - Determines the unit used for the sizeLimit,
 * one of <'B', 'KB', 'MB' or 'GB'>
 *
 * @author Erik Isidore
 */

const rule: ValidationRule = {
  validate: (
    value: File | FileList,
    multiple: boolean,
    accept: Array<string>,
    sizeLimit: number | string,
    sizeUnit: SizeUnit = 'KB'
  ): boolean => {
    if (!value) return true
    
    if (multiple)
      return Array
        .from((value as FileList))
        .every((file: File) => fileValidator(file, accept, sizeLimit, sizeUnit))

    return fileValidator(value as File, accept, sizeLimit, sizeUnit)
  },
  message: 'Arquivo(s) inválido(s)'
}

RuleContainer.add('file', rule)
export default rule
