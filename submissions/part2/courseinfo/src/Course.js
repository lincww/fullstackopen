const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  );
}
const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => (<p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  )
}
const Total = ({parts}) => {
  return (
    <b>
      total of {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} exercises
    </b>
  )
}
const Course = ({courses}) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </>
        )
      })}
    </>
  )
}

export default Course