import axios from "axios";
const baseDomain = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseDomain)
}

const newPhoneBook = (newName, newPhoneNumber) =>{
  return axios.post(baseDomain, {name: newName, number: newPhoneNumber})
}

const updatePhoneBook = (person, newPhoneNumber) => {
  if (window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)) {
    let data = {
      ...person,
      number: newPhoneNumber
    }
    console.log(person)
    return axios.put(baseDomain + `/${person.id}`, data)
  }
}

const deletePhoneBook = (person) => {
  if (window.confirm(`Delete ${person.name}`)) {
    return axios.delete(baseDomain + `/${person.id}`)
  }
}

export {getAll, newPhoneBook, updatePhoneBook, deletePhoneBook}