import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logOut } from 'src/state/session/actions'
import { accountSelector } from 'src/state/session/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const location = useLocation()
  const navigate = useNavigate()
  const callback = useCallback(() => navigate('/login', { state: { from: location } }), [location, navigate])

  const handleLogOut = () => {
    dispatch(logOut(callback))

    return callback
  }

  return { account, handleLogOut }
}

export default useContainer
