import {useEffect, useState} from 'react'
import {getAll, newPhoneBook, updatePhoneBook, deletePhoneBook} from './Requests'
import './index.css'

const Notification = ({message}) => {
  if (message.content) {
    return <div className={message.type}>
      {message.content}
    </div>
  }
}

const Persons = ({persons, filter, setPersons, handleMessage}) => {
  const handleDeleteButton = (deletedPerson) => {
    return (/*event*/) => deletePhoneBook(deletedPerson).then(() => {
      handleMessage(`Deleted ${deletedPerson.name}`)
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
    }).catch(()=>{
      handleMessage(`Information of ${deletedPerson.name} has already deleted.`, 'error')
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
    })
  }
  return (
    <div>
      {persons.map((person) => {
        if (filter === "" || person.name.toLowerCase().indexOf(filter) !== -1) {
          return (<p key={person.id}>{person.name} {person.number}
            <button onClick={handleDeleteButton(person)}>delete</button>
          </p>)
        }
      })}
    </div>
  )
}

const Filter = ({filter, setNewFilter}) => {
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  return (
    <p>filter shown with
      <input value={filter} onChange={handleFilterChange}/>
    </p>
  )
}

const PersonForm = ({newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange, handleAddButtonClick}) => {
  return (
    <form onSubmit={handleAddButtonClick}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
        <br/>
        phone: <input value={newPhoneNumber} onChange={handlePhoneNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState({type: 'info', content: ''})

  const handleMessage = (message, type = 'info') => {
    setMessage({type, content: message})
    setTimeout(() => {
      setMessage({type: "info", content: ""})
    }, 5000)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value)

  useEffect(() => {
    getAll().then(resp => setPersons(resp.data))
  }, [])

  const handleAddButtonClick = (event) => {
    event.preventDefault()
    let duplicatedPerson = persons.filter((person) => person.name === newName)
    if (duplicatedPerson.length) {
      let person = duplicatedPerson[0]
      updatePhoneBook(person, newPhoneNumber).then(resp => {
        setPersons(persons.map(person => person.id === resp.data.id ? resp.data : person))
        handleMessage(`Updated ${person.name}`)
      })
      return
    }
    newPhoneBook(newName, newPhoneNumber).then(resp => {
      setPersons(persons.concat(resp.data))
      handleMessage(`Added ${resp.data.name}`)
    })
    setNewName("")
    setNewPhoneNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} setNewFilter={setNewFilter}/>
      <h2>add a new</h2>
      <PersonForm handleAddButtonClick={handleAddButtonClick} handleNameChange={handleNameChange}
                  handlePhoneNumberChange={handlePhoneNumberChange} newPhoneNumber={newPhoneNumber} newName={newName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} handleMessage={handleMessage}/>
    </div>
  )
}

export default App