import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { usePlan } from "@/features/plan/components/PlanProvider";
import { FlatList } from "react-native";

const CompletedActiveWorkout = (props: { activeWorkout: ActiveWorkout }) => {
    const { activeWorkout } = props;
    return (
        <View style={{ borderRadius: 12, borderColor: 'gray', borderWidth: 1, padding: 5, marginVertical: 3 }}>
            <Text>
                {activeWorkout?.name} @ {new Date(activeWorkout?.end_at!).toLocaleString()}
            </Text>
        </View>
    )
}

const PlanTab = () => {
    const { plan } = usePlan()
    return (
        <Section>
            <Text h1>תכנית - {plan?.member?.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View>
                    {Boolean(plan?.activeWorkouts?.items?.length) ? <Text style={{ fontSize: 20, fontWeight: 'bold' }}>אימונים שהושלמו:</Text> :
                        <Text style={{ fontSize: 20 }}>מנוי זה עדיין לא השלים אימונים בתוכנית זו.</Text>}
                    <FlatList
                        data={plan?.activeWorkouts?.items || []}
                        renderItem={(info) => <CompletedActiveWorkout activeWorkout={info.item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </Section>
    );
}

export default PlanTab;