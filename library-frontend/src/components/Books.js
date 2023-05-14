import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS)
  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre,
    },
  })

  useEffect(() => {
    filteredBooks.refetch()
  }, [filteredBooks, selectedGenre])

  if (result.loading || filteredBooks.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  const handleGenreClick = genre => {
    setSelectedGenre(genre)
  }

  const books = result.data.allBooks
  const allGenres = [...new Set(books.flatMap(b => b.genres))]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Genres</h2>
      <button onClick={() => handleGenreClick('')}>all genres</button>
      {allGenres.map(genre => (
        <button key={genre} onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
