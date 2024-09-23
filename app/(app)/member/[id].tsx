import MemberPage from "@/pages/auth/member";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
    const { id }: { id: string } = useLocalSearchParams();
    return (<MemberPage memberId={id} />)
}