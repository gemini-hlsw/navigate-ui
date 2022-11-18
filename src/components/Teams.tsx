import { Outlet } from "react-router-dom"

const teams = [
  {name: "team1", description: "Something about the team"},
  {name: "team2", description: "Something about the team"},
  {name: "team3", description: "Something about the team"},
  {name: "team4", description: "Something about the team"},
  {name: "team5", description: "Something about the team"},
  {name: "team6", description: "Something about the team"},
  {name: "team7", description: "Something about the team"}
]

export default function Teams() {
  let renderTeams: JSX.Element[] = []
  teams.forEach((t, idx) => {
    renderTeams.push(
      <li key={`team-${idx}`}>{t.name}: {t.description}</li>
    )
  })

  return (
    <>
      <ul>
        {renderTeams}
      </ul>
      <Outlet />
    </>
  )
}