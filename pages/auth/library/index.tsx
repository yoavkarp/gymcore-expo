import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useListLibraryWorkoutsQuery } from "@/graphql";
import { FlatList, RefreshControl } from "react-native";

const LibraryPage = () => {

    const { data, loading, error, refetch } = useListLibraryWorkoutsQuery();

    return (
        <View>
            <Text h1>ספרייה</Text>
            <FlatList
                style={{ minHeight: 1000 }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}
                keyExtractor={(item) => item.id}
                data={data?.listLibraryWorkouts?.items}
                renderItem={({ item }) => (
                    <Text>{item?.name}</Text>
                )}
            />
        </View>
    );
}

export default LibraryPage;