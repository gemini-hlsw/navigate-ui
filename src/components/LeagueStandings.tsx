const teams = [
  {name: "team1", description: "Something about the team"},
  {name: "team2", description: "Something about the team"},
  {name: "team3", description: "Something about the team"},
  {name: "team4", description: "Something about the team"},
  {name: "team5", description: "Something about the team"},
  {name: "team6", description: "Something about the team"},
  {name: "team7", description: "Something about the team"}
]

export default function LeagueStandings() {
  return (
    <ul>
      {teams.map((t, idx) => {
        return (<ol key={`team-${idx}`}>{t.name}</ol>)
      })}
    </ul>
  )
}