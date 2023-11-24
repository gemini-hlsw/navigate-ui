import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client"

// Styles
import "./styles/main.scss"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

// Components
import AuthProvider from "./components/Auth/AuthProvider"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import VariablesProvider from "./components/Variables/VariablesProvider"

const navigateCommandServer = new HttpLink({
  uri: "/navigate/graphql",
})

const navigateConfigs = new HttpLink({
  uri: "http://localhost:4000/",
})

const rickAndMortyLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
})

const odbLink = new HttpLink({
  uri: "https://lucuma-postgres-odb-staging.herokuapp.com/odb",
  headers: {
    authorization: `Bearer ${process.env.ODB_TOKEN}`,
  },
})

// Subscription channel
import { WebSocketLink } from "@apollo/client/link/ws"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { getMainDefinition } from "@apollo/client/utilities"

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:7070/navigate/ws")
)

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "odb",
    odbLink,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === "rickAndMorty",
      rickAndMortyLink,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === "navigateConfigs",
        navigateConfigs,
        ApolloLink.split(
          ({ query }) => {
            let definition = getMainDefinition(query)
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            )
          },
          wsLink,
          navigateCommandServer
        )
      )
    )
  ),
  cache: new InMemoryCache(),
})

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
