import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useGetMemberByIdQuery } from "@/graphql";
import MemberDetailsCard from "./member-details";
import MemberMeasurementsCard from "./member-measurements";
import MemberPlanSection from "./member-plan-section";
import MemberProfileWorkoutsSection from "./member-profile-workouts-section";

interface MemberPageProps {
    memberId: string
}

const MemberPage: React.FC<MemberPageProps> = ({ memberId }) => {
    const query = useGetMemberByIdQuery({ variables: { id: memberId } })

    if (query.loading) {
        return <LoadingIndicator />
    }

    if (query.error) {
        return <Text error>{query.error.message}</Text>
    }

    if (!query.data?.getMemberById) {
        return <Text error>Data not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 10, flex: 1 }}>
            <MemberDetailsCard member={query.data!.getMemberById} />
            <MemberMeasurementsCard memberId={memberId} measurement={query.data.getMemberById.measurement} />
            <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                <MemberProfileWorkoutsSection />
                <MemberPlanSection />
            </View>
        </View>
    );
}

export default MemberPage;