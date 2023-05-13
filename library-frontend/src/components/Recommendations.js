import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = props => {
  const result = useQuery(ALL_BOOKS)
  const meQuery = useQuery(ME)
  if (!props.show) {
    return null
  }

  const me = meQuery.data.me
  if (result.loading || meQuery.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

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
