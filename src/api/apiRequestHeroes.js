import axios from 'axios'
// import md5 from 'md5'

const publicKey = "60a102569ba4ccc05c57af19ebeaf636"
const ts = 6
const hash = "c96130248d43dbb1b0583dde5de35803" // md5(ts + privateKey + publicKey) nesta ordem, inverter a ordem a hash não é a mesma.

export const params = {
  ts: `${ts}`,
  apikey: `${publicKey}`,
  hash: `${hash}`
}

export const axiosBaseURL = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`
})