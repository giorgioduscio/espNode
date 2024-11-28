module.exports =
function itemize(
  object:any, 
  callback:(value: string, index: number, array: string[])=>string
){ 
  return Object.keys(object).map(callback)
}