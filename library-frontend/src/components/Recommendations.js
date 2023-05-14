import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show, token }) => {
  const result = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(ME, {
    skip: !token,
  })

  if (!show) {
    return null
  }

  if (result.loading || loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const { me } = data

  if (!me) {
    return null
  }

  const filteredBooks = me.favoriteGenre
    ? books.filter(book => book.genres.includes(me.favoriteGenre))
    : books

  return (
    <div>
      <div>
        Hello {me.username} Books in your favorite genre {me.favoriteGenre}
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
