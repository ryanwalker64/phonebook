import Person from "./Person"

export default function Persons(props) {
    return (
      <>
      {props.persons.map(person => <Person key={person.id} person={person} deleteHandler={props.deleteHandler}/>)}
      </>
    )
  }