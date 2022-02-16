import { useState, MouseEvent } from 'react'
import { useSelector } from '@app/hooks'

import Button from '../../shared/components/Button'

import {
  selectConnected,
  selectSessionId,
  selectAccountId
} from '../user/user.slice'

import { postTMDB } from '../../shared/helpers'

interface MovieFavoriteProps {
  id: number
}

export default function MovieFavorite(props: MovieFavoriteProps) {
  const sessionId = useSelector(selectSessionId)
  const connected = useSelector(selectConnected)
  const accountId = useSelector(selectAccountId)

  const [isFavorite, setFavorite] = useState(false)

  const handleFavorite = async (ev: MouseEvent) => {
    ev.preventDefault()
    if (isFavorite) return

    try {
      await postTMDB(
        `account/${accountId}/favorite`,
        {
          media_type: 'movie',
          media_id: props.id,
          favorite: true
        },
        { session_id: sessionId }
      )

      setFavorite(fav => !fav)
    } catch {}
  }

  return (
    <>
      {connected && (
        <Button
          onClick={handleFavorite}
          active={isFavorite}
          disabled={isFavorite}
        >
          Ajouter aux favoris
        </Button>
      )}
    </>
  )
}
