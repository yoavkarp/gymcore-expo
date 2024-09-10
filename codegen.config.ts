import { CodegenConfig } from '@graphql-codegen/cli'
import awsConfig from './constants/aws-exports'

const config: CodegenConfig = {
    schema: "schema.json",
    documents: ["**/*.tsx"],
    generates: {
        'graphql/index.tsx': {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                withHooks: true,
                withComponents: true,
            }
        }
    }
}

export default config