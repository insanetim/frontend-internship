import * as types from '../types'
import reducer from '../reducers'

describe('watchlistReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      watchlist: {}
    })
  })

  it('should handle SET_WATCHLIST', () => {
    const action = {
      type: types.SET_WATCHLIST,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      watchlist: { id: 1 }
    })
  })
})