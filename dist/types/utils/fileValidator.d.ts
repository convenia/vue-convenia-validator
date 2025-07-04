export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB';
export type FileValidatorOpts = {
    multiple: boolean;
    accept: Array<string>;
    sizeLimit: number | string | null;
    sizeUnit: SizeUnit;
};
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
declare const _default: (file: File, accept: Array<string>, sizeLimit: number | string | null, sizeUnit?: SizeUnit) => boolean;
export default _default;
