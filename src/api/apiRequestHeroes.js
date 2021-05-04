import axios from 'axios'
// import md5 from 'md5'

// const publicKey = "b851322ff45094f53be8e488f1c3db76"
const publicKey = "60a102569ba4ccc05c57af19ebeaf636"
const ts = 6 // valor para alterar a cada requisição
const hash = "c96130248d43dbb1b0583dde5de35803" // md5(ts + privateKey + publicKey) nesta ordem, inverter a ordem a hash não é a mesma.
// console.log(md5(ts + "d7f4c9eed1713179be07552261eabcc8f2453f2d" + publicKey))
export const params = {
  ts: `${ts}`,
  apikey: `${publicKey}`,
  hash: `${hash}`
}

// export function LoadData() {
//   return (
//     <div>
//       <h1>hash = {md5(ts + privateKey + publicKey)}</h1>
//       <h1>key = {privateKey}</h1> */}
//       <a href={`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`}>teste api</a>
//     </div>
//   )
// }

export const axiosBaseURL = axios.create({
  baseURL: `http://gateway.marvel.com/v1/public/`
})