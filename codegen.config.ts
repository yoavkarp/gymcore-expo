import { CodegenConfig } from '@graphql-codegen/cli'
import awsConfig from './constants/aws-config'

const config: CodegenConfig = {
    schema: "schema.json",
    documents: ["graphql/**/*.graphql"],
    generates: {
        'graphql/index.ts': {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                withHooks: true,
                scalars: {
                    "AWSPhone": "string"
                }
            }
        }
    }
}

export default config