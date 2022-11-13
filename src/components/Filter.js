export default function Filter(props) {
    return (
      <input value={props.search} onChange={props.handleSearch} />
    )
  }