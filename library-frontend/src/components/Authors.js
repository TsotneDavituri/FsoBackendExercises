import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR, ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Authors = props => {
  const result = useQuery(ALL_AUTHORS)
  const [editBirth] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = event => {
    event.preventDefault()

    editBirth({ variables: { name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              value={setBornTo}
              onChange={({ target }) => setSetBornTo(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
