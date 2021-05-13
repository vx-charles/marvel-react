import axios from 'axios'
// import md5 from 'md5'

const publicKey = "b851322ff45094f53be8e488f1c3db76"
const ts = 6
const hash = "3899499c303701d1eed4542ec134f4da" // md5(ts + privateKey + publicKey) nesta ordem, inverter a ordem a hash não é a mesma.

export const params = {
  ts: `${ts}`,
  apikey: `${publicKey}`,
  hash: `${hash}`
}

export const axiosBaseURL = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`
})