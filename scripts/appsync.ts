import { execAsync } from "./utils/execAsync";
import chalk from 'chalk'
const fetchSchema = async () => {
    console.log(chalk.bgBlue(" Fetching schema from AWS AppSync... "))
    await execAsync("npx", "@aws-amplify/cli", "codegen")
    await execAsync("npx", "graphql-codegen", "--config", "codegen.config.ts")
    console.log(chalk.bgGreenBright(" Schema fetched successfully! "))
}

fetchSchema();