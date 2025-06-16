import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const Persons = (props) => {
  //personsToShow arvo val1, jos ehto (newFilter) pätee, muuten val2
  const personsToShow = props.newFilter
    //val1
    ? props.persons.filter((person) => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    //val2
    : props.persons
  
    return (
      <div>
        {personsToShow.map(person =>
          <div key={person.name}>
            {person.name} {person.number} { }
            <button type="submit" onClick={() => props.delPerson(person.id)}>delete</button>
          </div>)}
      </div>
    )
}

const Filter = (props) => {
  return (
    <form>
      <div>filter shown with <input onChange={props.handleFilter} /></div>
    </form>
  )
}

const Personform = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>name: <input value={props.newName} onChange={props.handleName} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumber} /></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [infoMessage, setMessage] = useState(null)
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        //console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(persons)
    const etsi = persons.find(person => person.name === personObject.name)
    if (etsi) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {    
        personService
          .create(personObject)
          .then(returnedObject => {
            setPersons(persons.concat(returnedObject))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${returnedObject.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            //console.log(error)
            setError(`${error.response.data.error}`)
            console.log(error.response.data.error)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
  } 

  const delPerson = (id) => {
    console.log(id)
    const removedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${removedPerson.name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${removedPerson.name}`)
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Personform addPerson={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} delPerson={delPerson}/>
    </div>
  )
}

export default App