/** 
 * Checks whether the given param is empty or not (empty = undefined or null). 
 * @param param The param to check if it is empty. 
 */ 
export const isEmpty = (param: any) => ((typeof param === 'undefined') || (param === null) || (param === undefined)); 
 
/** 
 * Checks whether the given param is empty (empty = {}). 
 * @param param The param to check if it is empty. 
 */ 
export const isNullOrEmptyObject = (param: any) => ((isEmpty(param) || (Object.keys(param).length === 0 && param.constructor === Object)));

/** 
 * Checks whether the given param is a number. 
 * @param param The param to check if it is a number. 
 */ 
export const isNumber = (param: any) => 
    (!isEmpty(param) && (typeof param !== 'boolean') && !isNaN(Number(param)) && !(typeof param === 'string' && isNullOrWhiteSpace(param as string)));

/** 
 * Returns whether the string is null or whitespace. 
 * @param str The string 
 */ 
export const isNullOrWhiteSpace = (str?: string) => (isEmpty(str) || !str || (`${str}`.replace(/\s/g, '').length === 0));