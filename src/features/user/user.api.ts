import { fetchTMDB, postTMDB } from './../../shared/helpers/index'

export const fetchRequestToken = async () => {
  const data = await fetchTMDB('authentication/token/new')
  const { request_token: token } = data

  return token
}

export const fetchSession = async (token: string) => {
  const { session_id: sessionId } = await postTMDB(
    'authentication/session/new',
    { request_token: token }
  )

  const { id: accountId } = await fetchTMDB(
    'account',
    {},
    { session_id: sessionId }
  )

  return { sessionId, accountId }
}
