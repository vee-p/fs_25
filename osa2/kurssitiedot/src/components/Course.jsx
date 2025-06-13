const Course = (props) => {
  console.log(props)
  return (
    <div>
      <Header course = {props.course} />
      <Content parts = {props.course.parts} />
      <Total parts = {props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h2>{props.course.name}</h2>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} parts={part}/>)}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.parts.name} {props.parts.exercises}</p>
  )
}

const Total = (props) => {
  console.log(props)
  const summa = props.parts.reduce((s, {exercises}) => s + exercises, 0)
  return (
    <div>
      <b>total of {summa} exercises</b>
    </div>
  )
}

export default Course