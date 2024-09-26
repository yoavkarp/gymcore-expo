import MemberPage from "@/pages/auth/member";
import { useLocalSearchParams } from "expo-router";

type MemberPageProps = {
    id: string
}

export default function Index() {
    const { id } = useLocalSearchParams<MemberPageProps>();
    return (<MemberPage memberId={id} />)
}