import { Button } from "primereact/button"
import Guider from "./Guider"

export default function Guiders({ canEdit, children }: { canEdit: boolean, children: any }) {
  let guiders: JSX.Element[] = []

  children.map((child: any, index: number) => {
    guiders.push(
      <Guider canEdit={canEdit} key={`guider-${index}`}>{child}</Guider>
    )
  })

  return (
    <>
      {guiders}
      <div className="pl-5 pr-5">
        <Button disabled={!canEdit} className="w-100" label="Point to guide target" />
      </div>
    </>
  )
}