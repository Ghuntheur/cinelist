import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useDispatch } from '@app/hooks'
import { authenticate, createSession } from './user.slice'

export default function Authenticate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    const { token } = params

    dispatch(authenticate(token as string))
    dispatch(createSession(token as string))

    navigate('/')
  }, [])

  return <div>ici</div>
}
