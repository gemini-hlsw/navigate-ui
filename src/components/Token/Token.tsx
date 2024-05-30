import { useContext } from "react"
import { InputText } from "primereact/inputtext"
import "./Login.scss"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export default function Token() {
  const navigate = useNavigate()
  const { odbToken, setOdbToken } = useContext(VariablesContext)

  return (
    <div className="login">
      <div className="box">
        <div className="title">
          <div className="text">Navigate</div>
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <InputText
            placeholder="ODB Token"
            value={odbToken}
            onChange={(e) => setOdbToken(e.target.value)}
          />
        </div>
        <Button
          label="Done"
          icon="pi pi-check"
          iconPos="right"
          className=" p-button-success"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  )
}
