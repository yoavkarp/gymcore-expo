import { CodegenConfig } from '@graphql-codegen/cli'
import awsConfig from './constants/aws-config'

const config: CodegenConfig = {
    schema: "features/appsync/schema.json",
    documents: ["features/**/*.graphql", "**/*.graphql"],
    generates: {
        'graphql/index.ts': {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                withHooks: true,
                scalars: {
                    "AWSDate": "string",
                    "AWSDateTime": "string",
                    "AWSTime": "string",
                    "AWSJSON": "{ [x: string]: any }",
                    "AWSPhone": "string",
                    "AWSURL": "string",
                    "AWSEmail": "string",
                    "AWSTimestamp": "number"
                },
            }
        }
    }
}

export default config