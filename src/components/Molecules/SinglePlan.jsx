import styled from 'styled-components'

export default function SinglePlan({ planData }) {
  const { title, weight, count } = planData
  return (
    <SinglePlanContainer>
      <List>{title}</List>
      <List>{weight}</List>
      <List>{count}</List>
    </SinglePlanContainer>
  )
}

const SinglePlanContainer = styled.ul`
  display: flex;
  margin-top: 0.5rem;
`

const List = styled.li`
  width: 10rem;
  margin-right: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
`
