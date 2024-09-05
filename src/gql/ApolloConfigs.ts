// Apollo
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, defaultDataIdFromObject } from '@apollo/client';

// Subscription channel
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql/language';
import { Environment } from '@/Helpers/environment';

export function createClient(env: Environment) {
  const navigateCommandServer = new HttpLink({ uri: env.navigateServerURI });

  const navigateConfigs = new HttpLink({ uri: env.navigateConfigsURI });

  const odbLink = new HttpLink({ uri: env.odbURI });

  const wsLink = new WebSocketLink(new SubscriptionClient(env.navigateServerWsURI));

  return new ApolloClient({
    name: 'navigate-ui',
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'odb',
      odbLink,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === 'navigateConfigs',
        navigateConfigs,
        ApolloLink.split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === Kind.OPERATION_DEFINITION && definition.operation === OperationTypeNode.SUBSCRIPTION
            );
          },
          wsLink,
          navigateCommandServer,
        ),
      ),
    ),
    cache: new InMemoryCache({
      dataIdFromObject(responseObject) {
        // Configure primary-key fields for cache normalization to use 'pk' field
        if (
          'pk' in responseObject &&
          (typeof responseObject.pk === 'string' || typeof responseObject.pk === 'number')
        ) {
          return `${responseObject.__typename}:pk:${responseObject.pk}`;
        } else {
          return defaultDataIdFromObject(responseObject);
        }
      },
      // Configure primary-key fields for cache normalization
      typePolicies: {
        GuideAlarm: {
          keyFields: ['wfs'],
        },
      },
    }),
  });
}
