
import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/PersonsList';
import phoneServices from './services/phonebook';

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('enter a name...')
  const [newPhoneNumber, setPhoneNumber] = useState('enter a number')
  const [search, setSearch] = useState('')
  const [searchPersons, setSearchPersons] = useState()

  useEffect(() => {
    phoneServices.getAll()
    .then((response) => {
      console.log(response)
      setPersons(response)
    })
  }, [])

  function handleSearch(e) {
    setSearch(e.target.value)
    const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    setSearchPersons(searchResults)
  }

  const displayPersons = searchPersons ? searchPersons : persons

  function handleName(e) { setNewName(e.target.value) }

  function handlePhone(e) { setPhoneNumber(e.target.value) }

  function handleNewPerson(e) {
    e.preventDefault()
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      // alert(`${newName} already exists`)
      const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      if(window.confirm(`${newName} already exists, do you wish to replace their number?`)) {
        updatePerson(foundPerson.id, newPhoneNumber)
      }
    } else {
         const personObject = {
          name: newName,
          number: newPhoneNumber,
          id: persons.length + 1
         }
         phoneServices.create(personObject)
         .then(response => { setPersons(persons.concat(response))})
    }
  }

  function deletePerson(id) {
    if(persons.find(person => person.id === id)) {
      console.log('found');
      phoneServices.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        
      })
    }
  }

  function updatePerson(id, updatedNumber) {
    const existingUserObject = persons.find(person => person.id === id)
    if(existingUserObject) {
      const personObject = {
        ...existingUserObject,
        number: updatedNumber
       }
      phoneServices.update(id, personObject)
      .then(() => {
        setPersons(persons.map(person => person.id !== id ? person : personObject))
        
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter search={search} handleSearch={handleSearch}/>
      <h2>Add new person</h2>
        <PersonForm 
          handleNewPerson={handleNewPerson}
          handleName={handleName}
          newName={newName}
          newPhoneNumber={newPhoneNumber}
          handlePhone={handlePhone}
        />
      <h2>Numbers</h2>
      <div>
        <Persons persons={displayPersons} deleteHandler={deletePerson}/>
        </div>
    </div>
  )
}


export default App;
