// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client"

// Subscription channel
import { WebSocketLink } from "@apollo/client/link/ws"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { getMainDefinition } from "@apollo/client/utilities"

const navigateCommandServer = new HttpLink({
  uri:
    import.meta.env.VITE_NG_SERVER_URI ??
    "http://navigate.lucuma.xyz:5173/navigate/graphql",
})

const navigateConfigs = new HttpLink({
  uri:
    import.meta.env.VITE_NG_CONFIGS_URI ?? "http://navigate.lucuma.xyz:5173/db",
})

const odbLink = new HttpLink({
  uri:
    import.meta.env.VITE_ODB_URI ??
    "https://lucuma-postgres-odb-staging.herokuapp.com/odb",
})

const wsLink = new WebSocketLink(
  new SubscriptionClient(
    import.meta.env.VITE_NG_WS ?? "ws://navigate.lucuma.xyz:9070/navigate/ws"
  )
)

export const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "odb",
    odbLink,
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
  ),
  cache: new InMemoryCache(),
})
