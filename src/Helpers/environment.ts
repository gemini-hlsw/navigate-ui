import environments from '../assets/environments.json';

export type Environment = (typeof environments)[0];

const getEnvironmentForHost = (host: string) => environments.find((e) => e.hostName === host);

export function getEnvironment(): Environment {
  const env = getEnvironmentForHost(window.location.hostname) ?? getEnvironmentForHost('*')!;

  console.log(`Loaded ${env.environment} environment`, env);
  return env;
}
