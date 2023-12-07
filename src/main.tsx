import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Apollo
import { ApolloProvider } from "@apollo/client"
import { client } from "./gql/ApolloConfigs"

// Styles
import "./styles/main.scss"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

// Components
import AuthProvider from "@Contexts/Auth/AuthProvider"
import Layout from "./components/Layout/Layout"
import Home from "./components/Layout/Home/Home"
import Login from "./components/Login/Login"
import VariablesProvider from "@Contexts/Variables/VariablesProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <VariablesProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </VariablesProvider>
    </ApolloProvider>
  </AuthProvider>
)
