import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { SplitButton } from "primereact/splitbutton"
import { Button } from "primereact/button"
import "./Navbar.scss"

export default function Navbar() {
  let {
    theme,
    toggleTheme,
    configuration,
    configurationChanges,
    setIsConfigModalVisible,
  } = useContext(VariablesContext)
  let auth = useContext(AuthContext)
  let navigate = useNavigate()

  let themeIcon: string = theme === "dark" ? "pi pi-moon" : "pi pi-sun"

  function userSession() {
    if (auth.isUserLoggedIn) {
      auth.signout()
    } else {
      navigate("/login")
    }
  }

  const items = [
    {
      label: "Switch theme",
      icon: themeIcon,
      command: toggleTheme,
    },
    {
      label: auth.isUserLoggedIn ? "Logout" : "Login",
      icon: auth.isUserLoggedIn ? "pi pi-sign-out" : "pi pi-sign-in",
      command: userSession,
    },
  ]

  let configSave: JSX.Element | null = null
  if (configurationChanges?.length && configurationChanges?.length > 0) {
    configSave = (
      <Button
        icon="pi pi-save"
        iconPos="left"
        className="p-button-text nav-btn blink-btn"
        tooltip="Save configuration"
        tooltipOptions={{ position: "bottom" }}
        onClick={() => setIsConfigModalVisible(true)}
      >
        {"\u00A0"}
      </Button>
    )
  }

  return (
    <nav className="top-bar">
      <div className="left">
        <Link to="/">
          <Button
            icon="pi pi-map"
            iconPos="left"
            className="p-button-text nav-btn main-title"
          >
            <span>N</span>
            <span>A</span>
            <span>V</span>
            <span>I</span>
            <span>G</span>
            <span>A</span>
            <span>T</span>
            <span>E</span>
          </Button>
        </Link>
        <span className="site">Site</span>
      </div>
      <div className="center">
        <span className="observation">{configuration.observation?.name}</span>
      </div>
      <div className="right">
        {configSave}
        <SplitButton
          label={auth.isUserLoggedIn ? auth.user.displayName : "Guest"}
          icon="pi pi-user"
          className="p-button-text nav-btn"
          model={items}
        ></SplitButton>
      </div>
    </nav>
  )
}
