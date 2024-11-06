import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { usePlan } from "@/features/plan/components/PlanProvider";
import { ActiveWorkout } from "@/graphql";
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
                    {!Boolean(plan?.workouts?.items?.length) && <Text>אין אימונים בתכנית זו, באפשרותך להוסיף אימונים בטאב "אימונים"</Text>}
                    {!Boolean(plan?.events?.items?.length) && <Text>אין מפגשים בתכנית זו, באפשרותך להוסיף מפגשים בטאב "מפגשים"</Text>}

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