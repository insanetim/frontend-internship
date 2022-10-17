import axios from 'axios'
import { merge } from 'lodash'

import { API_KEY, API_URL } from 'src/constants'

const baseURL = API_URL

const httpClient = axios.create({
  baseURL,
  timeout: 10000
})

httpClient.interceptors.request.use(config =>
  merge(config, {
    params: {
      api_key: API_KEY
    }
  })
)

export default httpClient