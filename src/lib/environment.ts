import dotenv from "dotenv"

export function getLocalEnvironment(): void {
  const config = dotenv.config();
  if (config.error) {
    throw config.error;
  }
}
