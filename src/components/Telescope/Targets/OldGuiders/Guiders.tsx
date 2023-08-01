import { Button } from "primereact/button"
import { Title } from "../../Title/Title"
import { Guider } from "./Guider"
import React, { useContext } from "react"
import { AuthContext } from "../../Auth/AuthProvider"

export function Guiders({ children }: { children: React.ReactNode }) {
  const { canEdit } = useContext(AuthContext)
  let guiders: JSX.Element[] = []
  React.Children.map(children, (child, index) => {
    guiders.push(
      <Guider canEdit={canEdit} key={`guider-${index}`}>{child}</Guider>
    )
  })

  return (
    <div className="guiders">
      <Title title="Guiders" />
      {guiders}
      <div className="pl-5 pr-5">
        <Button disabled={!canEdit} className="w-100" label="Point to guide target" />
      </div>
    </div>
  )
}