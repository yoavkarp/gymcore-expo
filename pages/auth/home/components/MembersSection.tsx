// import { CreateMemberMutation, CreateMemberMutationVariables, Gender, Member, SearchMembersQuery, SearchMembersQueryVariables } from "@/features/appsync/API";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { useMemo, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import CreateMemberModal from "./CreateMemberModal";
import { useSnackbar } from "@/contexts/SnackbarContext";
import MemberCard from "@/components/api-ui/MemberCard";
import React from "react";
import { phoneNumberRegex } from "@/constants/regex";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { View } from "@/components/ui/View";
import { useMembersHistory } from "@/features/members";
import { Href, router } from "expo-router";
import { Gender, Member, useCreateMemberMutation, useSearchMembersLazyQuery } from "@/graphql";


interface MembersSectionProps {

}

const MembersSection: React.FC<MembersSectionProps> = () => {

    const [fromCache, setFromCache] = useState<string[]>([]);

    const [searchText, setSearchText] = useState<string>('');
    const [showCreateMemberModal, setShowCreateMemberModal] = useState<boolean>(false);

    const [createMemberMutation, { data: createMemberMutationData }] = useCreateMemberMutation({
        onCompleted(data) {
            show("המנוי נוצר בהצלחה", "success")
            handleMemberCardPress(data.createMember as Member)
        },
        onError(err) {
            console.log(err)
            show("אירעה שגיאה ביצירת המנוי", "error")
        }
    });
    const [searchMembersQuery, { data: searchMembersQueryData, loading: isSearchingMembers, client }] = useSearchMembersLazyQuery();

    const [show] = useSnackbar()

    const handleChange = (text: string) => {
        setSearchText(text);
        searchMembersQuery({
            variables: { text: text },
            onCompleted() {
                if (fromCache.includes(text)) return;
                setFromCache(prev => [...prev, text])
                setTimeout(() => {
                    setFromCache(prev => prev.filter((e) => e !== text))
                }, 30000);
            },
            fetchPolicy: fromCache.includes(text) ? "cache-first" : "network-only"
        })
    };

    const userDoesNotExists = useMemo(() => searchMembersQueryData?.searchMembers?.length === 0 && !isSearchingMembers && phoneNumberRegex.test(searchText), [searchMembersQueryData, isSearchingMembers, searchText]);

    const [_, pushToMembersHistory] = useMembersHistory();

    const handleMemberCardPress = (member: Partial<Member>) => {
        pushToMembersHistory(member)
        console.log("HERE");
        router.push(`member/${member.id}` as Href)
    }

    return (
        <View>
            <Text h1>חיפוש מנויים</Text>
            <Text subtitle>יש לרשום מספר טלפון להצגת תוצאות</Text>
            <TextInput value={searchText} onChangeText={handleChange} style={{ maxWidth: 400, textAlign: 'center' }} />
            <FlatList
                style={{ alignSelf: 'flex-start', width: 400, maxHeight: 600 }}
                keyboardShouldPersistTaps="always"
                data={searchMembersQueryData?.searchMembers}
                keyExtractor={item => item?.id!}
                renderItem={({ item }) => item ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => handleMemberCardPress(item)}>
                        <MemberCard member={item} />
                    </TouchableOpacity>
                ) : null}
                ListEmptyComponent={() => {
                    return isSearchingMembers ? <LoadingIndicator size={30} style={{ alignSelf: "center", padding: 20 }} /> : userDoesNotExists && <View style={{ alignItems: 'center', gap: 10, paddingVertical: 10, flexDirection: 'row' }}>
                        <Text>{searchText} לא קיים</Text>
                        <Button onPress={() => setShowCreateMemberModal(true)}>הוסף מנוי</Button>
                    </View>
                }} />
            <CreateMemberModal onSubmit={async (info) => {
                await createMemberMutation({
                    variables: {
                        input: {
                            name: info.name,
                            phone_number: `+972${info.phone_number}`,
                            email: info.email,
                            birthdate: info.birthdate,
                            gender: info.gender as Gender,
                        }
                    }
                })

            }} defaultPhoneNumberValue={searchText} onDismiss={() => setShowCreateMemberModal(false)} visible={showCreateMemberModal} />
        </View>
    );
}

export default MembersSection;