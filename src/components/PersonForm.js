
export default function PersonForm(props) {
    return (
      <form onSubmit={props.handleNewPerson}>
          <div>
            name: 
            <input value={props.newName} onChange={props.handleName} />
            phone: 
            <input value={props.newPhoneNumber} onChange={props.handlePhone} />
            
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }