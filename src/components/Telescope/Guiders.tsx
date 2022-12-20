import { Button } from "primereact/button"
import Guider from "./Guider"

export default function Guiders({ children }: { children: any }) {
  let guiders: JSX.Element[] = []

  children.map((child: any, index: number) => {
    guiders.push(
      <Guider key={`guider-${index}`}>{child}</Guider>
    )
  })

  return (
    <>
      {guiders}
      <div className="pl-5 pr-5">
        <Button className="w-100" label="Point to guide target" />
      </div>
    </>
  )
}