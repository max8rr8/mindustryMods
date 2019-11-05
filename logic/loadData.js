import { parseJson } from './fix';

function fetchUrls(url) {
  return fetch(url).then(res => res.text());
}

export function getModData(mod) {
  return fetchUrls(`https://raw.githubusercontent.com/${mod}/master/mod.json`).then(e => {
    try{
      console.log(e, parseJson(e))

      return Object.assign({}, {
        author: 'Unknown',
        description: 'Nothing to see here',
        version: 1,
        name: 'Unknown'
      }, parseJson(e))
    }catch(er){
      console.log(er, fixJson(e), mod, e)
      return {
        name: mod,
        author: "eRRoR",
        description: JSON.stringify(er)
      }
    }
  }
    
  );
}

export function getModReadme(mod) {
  return fetchUrls(`https://raw.githubusercontent.com/${mod}/master/README.md`);
}

export function getMods() {
  return fetchUrls(`https://gist.githubusercontent.com/maximmasterr/caaa13c6235046df1236847ecd382e1f/raw/ca92a3c8de3b1349b08b29bba81e22bb34f1c178/mods.txt`).then(e=>e.split('\n'))
}