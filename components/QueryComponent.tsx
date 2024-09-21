import { ApolloError, OperationVariables, useQuery } from "@apollo/client"
import { PropsWithChildren } from "react";
import Text from './ui/Text';
type QueryComponentProps<TData = any, TVariables extends OperationVariables = OperationVariables, TProps = {}> = {
    query: Parameters<typeof useQuery<TData, TVariables>>[0];
    options?: Parameters<typeof useQuery<TData, TVariables>>[1];
    component: React.FC<ReturnType<typeof useQuery<TData, TVariables>>>;
} & TProps;

const QueryViewError: React.FC<PropsWithChildren<{ error: ApolloError }>> = (props) => {
    return props.children || <Text>Error: {props.error.message}</Text>
}

const QueryViewLoading = ({ children }: PropsWithChildren) => {
    return children || <Text>Loading...</Text>
}

const QueryView: React.FC<QueryComponentProps> = (props) => {

    const query = useQuery(props.query, props.options);

    if (query.loading) {
        return <QueryViewLoading />
    }

    if (query.error) {
        return <QueryViewError error={query.error} />
    }

    return props.component(query)
}

export default QueryView;