import { createLogic } from 'redux-logic'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { setWatchlist } from '../actions'

const fetchWatchlist = createLogic({
  type: types.FETCH_WATCHLIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = pathOr(1, ['payload'], action)

    try {
      const { data } = await httpClient.get(endpoints.getWatchlist(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(setWatchlist(data))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default fetchWatchlist
