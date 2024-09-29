import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useTheme } from "@/contexts/ThemeContext";
import { GetMemberByIdQuery, useGetMemberByIdQuery } from "@/graphql";
import { Theme } from "@/theme";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface MemberProfileWorkoutsSectionProps {
    memberId: string;
}

type ProfileWorkoutResult = Exclude<Exclude<Exclude<GetMemberByIdQuery['getMemberById'], null | undefined>['profile_workouts'], null | undefined>['items'], null | undefined>[number];

const MemberProfileWorkoutItem: React.FC<{ workout: ProfileWorkoutResult }> = ({ workout }) => {
    const { theme } = useTheme();
    return (
        <Card style={{ margin: 10 }}>
            <Text style={{ textAlign: 'justify' }}>{workout.name}</Text>
            <Text subtitle>{new Date(workout.updated_at).toLocaleString()}</Text>
        </Card>
    )
}

const MemberProfileWorkoutsSection: React.FC<MemberProfileWorkoutsSectionProps> = (props) => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const createWorkoutModalRef = useRef<CreateWorkoutModal>(null);
    const { data, loading, error } = useGetMemberByIdQuery({ fetchPolicy: "network-only", variables: { id: props.memberId } });

    return (
        <View style={styles.container}>
            <Text bulletColor={theme.colors.muted} h1>
                אימוני פרופיל
            </Text>
            <FlatList
                data={data?.getMemberById?.profile_workouts?.items}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.9} onPress={() => router.navigate(`/workout/${item.id}`)}>
                        <MemberProfileWorkoutItem workout={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
            <Button onPress={() => createWorkoutModalRef.current?.open()}>חדש</Button>

            <CreateWorkoutModal ref={createWorkoutModalRef} memberId={props.memberId} />
        </View>
    );
}

const stylesWithTheme = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.success,
        flex: 1,
        borderRadius: 8,
        padding: 10
    }
})

export default MemberProfileWorkoutsSection;