import { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';
import { Button } from 'primereact/button';
import { ParkStatus } from "../../../types";

export default function Instrument() {
  let auth = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false)
  const [mcsParkState, setMcsParkState] = useState<ParkStatus>('PENDING')

  const btnClass = {
    PENDING: "",
    ACTIVE: "p-button-warning",
    DONE: "p-button-success"
  }

  async function sendCommand() {
    setMcsParkState('ACTIVE')
    const res = await fetch(`/api/engage/commands/mcsPark/123e4567-e89b-12d3-a456-426614174000`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })

    console.log(res)
    if (res.status === 200) {
      setTimeout(() => setMcsParkState('DONE'), 2000)
    }
  }

  return (
    <div>
      <div>
        <Button
          label="mcsPark"
          icon="pi pi-cog"
          iconPos="right"
          disabled={!auth.isUserLoggedIn}
          className={`${btnClass[mcsParkState]}`}
          onClick={sendCommand}
          loading={loading}
        />
      </div>
    </div>
  )
}