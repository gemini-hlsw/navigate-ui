import Title from "./Title/Title"
import Instrument from "./Instrument/Instrument"
import Footer from "./Footer/Footer"
import "./TelescopeSetup.scss"

export default function TelescopeSetup() {
  return (
    <div className="telescope-setup">
      <Title />
      <Instrument />
      <Footer />
    </div>
  )
}