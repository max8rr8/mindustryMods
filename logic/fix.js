export function parseJson(str){
  let m;
  let res = {}
  
  const regex = /"([a-z]+)": ("[^"]+"|[0-9.]+)/gm;


  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) 
        regex.lastIndex++;
    
    if(m[2][0] == '"')
      res[m[1]] = m[2].slice(1, m[2].length - 1)
    else
      res[m[1]] = parseFloat(m[2])
  }
  
  return res
}

export function fixStr(str) {
  return str.replace(/\[[#a-zA-Z0-9]*\]/gm, '')
}