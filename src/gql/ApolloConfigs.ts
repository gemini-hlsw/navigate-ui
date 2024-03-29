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
  uri: "http://navigate.lucuma.xyz/navigate/graphql",
})

const navigateConfigs = new HttpLink({
  uri: "http://navigate.lucuma.xyz/db/",
})

const odbLink = new HttpLink({
  uri: "https://lucuma-postgres-odb-staging.herokuapp.com/odb",
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_ODB_TOKEN}`,
  },
})

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://navigate.lucuma.xyz/navigate/ws")
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
