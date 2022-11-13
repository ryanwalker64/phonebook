export default function Person(props) {
    return (
        <div>
            <span> {props.person.name} {props.person.number} </span>
            <button onClick={() => props.deleteHandler(props.person.id)}>Delete</button>
        </div>
    )
}