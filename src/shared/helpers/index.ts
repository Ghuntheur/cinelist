import dayjs from 'dayjs'

const commonTMDBFetch = async (
  endpoint: string,
  data: Record<string, any> = {},
  query: Record<string, any> = {},
  options: RequestInit = {},
  method = 'GET'
) => {
  const base = 'https://api.themoviedb.org/3'

  try {
    const url = new URL(`${base}/${endpoint}`)
    const searchParams = url.searchParams

    searchParams.append('api_key', process.env.REACT_APP_TMDB_API_KEY as string)

    Object.keys(query).forEach((key: string) => {
      searchParams.append(key, query[key])
    })

    if (method === 'GET') {
      searchParams.append('language', 'fr-FR')

      Object.keys(data).forEach((key: string) =>
        searchParams.append(key, data[key])
      )
    }

    const res = await fetch(url.toString(), {
      method,
      ...(method !== 'GET' && {
        body: JSON.stringify({
          ...data,
          language: 'fr-FR'
        })
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      ...options
    })

    const fetchedData = await res.json()
    return fetchedData
  } catch (err: any) {
    throw new Error(err)
  }
}

export const fetchTMDB = async (
  endpoint: string,
  data: Record<string, any> = {},
  query: Record<string, any> = {},
  options: RequestInit = {}
) => {
  return commonTMDBFetch(endpoint, data, query, options, 'GET')
}

export const postTMDB = async (
  endpoint: string,
  data: Record<string, any> = {},
  query: Record<string, any> = {},
  options: RequestInit = {}
) => {
  return commonTMDBFetch(endpoint, data, query, options, 'POST')
}

export const formatRelativeTime = (date: string): string => {
  const moreThanSixMonths = dayjs().diff(dayjs(date), 'months') >= 6

  return moreThanSixMonths
    ? dayjs(date).format('MMMM YYYY')
    : dayjs(date).fromNow()
}

export const slugify = (string: string): string => {
  let str = string.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaeeeeiiiioooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
