import { useState } from 'react'

export default function useFavorite(id: number) {
  const [isFavorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]').includes(id)
  )

  let favorites = localStorage.getItem('favorites') || '[]'

  let array: number[] = JSON.parse(favorites)

  const removeFavorite = () => {
    array = array.filter(item => item !== id)
    setFavorite(false)
    localStorage.setItem('favorites', JSON.stringify(array))
  }

  const addFavorite = () => {
    array.push(id)
    setFavorite(true)
    localStorage.setItem('favorites', JSON.stringify(array))
  }

  return [isFavorite, { removeFavorite, addFavorite }]
}
