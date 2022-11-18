import { useParams } from "react-router-dom"

export default function Team() {
  const params = useParams();

  return (
    <h3>
      Team: {params.teamId}
    </h3>
  )
}