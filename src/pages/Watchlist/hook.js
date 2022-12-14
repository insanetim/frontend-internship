import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { not, isEmpty } from 'ramda'

import { fetchWatchlist } from 'src/state/watchlist/actions'
import { changeMovieInWatchlist } from 'src/state/movie/actions'
import { accountSelector } from 'src/state/session/selectors'
import { watchlistSelector } from 'src/state/watchlist/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const watchlist = useSelector(watchlistSelector)

  const handlePagination = page => {
    dispatch(fetchWatchlist(page))
  }

  const handleDelete = (movieId, event) => {
    event.stopPropagation()
    const onOk = () => {
      dispatch(changeMovieInWatchlist({ movieId, inWatchlist: false }))
    }
    Modal.confirm({
      title: 'Do you want to delete movie from watchlist?',
      onOk
    })

    return onOk
  }

  useEffect(() => {
    if (not(isEmpty(account))) {
      dispatch(fetchWatchlist())
    }
  }, [account])

  return { watchlist, handlePagination, handleDelete }
}

export default useContainer
