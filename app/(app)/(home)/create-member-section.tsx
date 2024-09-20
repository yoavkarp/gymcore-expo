import { CreateMemberMutation, CreateMemberMutationVariables, Gender, SearchMembersQuery, SearchMembersQueryVariables } from "@/appsync/API";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useMemo, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import CreateMemberModal from "./create-member-modal";
import { useSnackbar } from "@/contexts/SnackbarContext";
import MemberCard from "@/components/api-ui/MemberCard";
import React from "react";
import { phoneNumberRegex } from "@/constants/regex";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useMembersHistory } from "@/contexts/MembersHistoryContext";


interface CreateMemberSectionProps {

}

const CreateMemberMutationGQL = gql`
    mutation CreateMember($input: CreateMemberInput!) {
        createMember(input: $input) {
            id
            name
            phone_number
        }
    }
`

const SearchMembersQueryGQL = gql`
    query SearchMembers($text: String!) {
        searchMembers(text: $text) {
            id
            name
            phone_number
            email
        }
    }
`

const CreateMemberSection: React.FC<CreateMemberSectionProps> = () => {

    const [fromCache, setFromCache] = useState<string[]>([]);

    const [searchText, setSearchText] = useState<string>('');
    const [showCreateMemberModal, setShowCreateMemberModal] = useState<boolean>(false);

    const [createMemberMutation, { data: createMemberMutationData }] = useMutation<CreateMemberMutation, CreateMemberMutationVariables>(
        CreateMemberMutationGQL
    )
    const [searchMembersQuery, { data: searchMembersQueryData, loading: isSearchingMembers, client }] = useLazyQuery<SearchMembersQuery, SearchMembersQueryVariables>(
        SearchMembersQueryGQL,

    )
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
                    console.log("Cache cleaned:", text)
                }, 30000);
            },
            fetchPolicy: fromCache.includes(text) ? "cache-first" : "network-only"
        })
    };

    const userDoesNotExists = useMemo(() => searchMembersQueryData?.searchMembers?.length === 0 && !isSearchingMembers && phoneNumberRegex.test(searchText), [searchMembersQueryData, isSearchingMembers, searchText]);

    const [_, pushMemberToHistory] = useMembersHistory();
    return (
        <View>
            <Text h1>חיפוש מנויים</Text>
            <Text subtitle>יש לרשום מספר טלפון להצגת תוצאות</Text>
            <TextInput value={searchText} onChangeText={handleChange} style={{ maxWidth: 400, textAlign: 'center' }} />
            <FlatList
                style={{ alignSelf: 'flex-start', width: 400 }}
                keyboardShouldPersistTaps="always"
                data={searchMembersQueryData?.searchMembers}
                keyExtractor={item => item?.id!}
                renderItem={({ item }) => item ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => pushMemberToHistory(item)}>
                        <MemberCard member={item} />
                    </TouchableOpacity>
                ) : null}
                ListEmptyComponent={() => {
                    return isSearchingMembers ? <LoadingIndicator size={30} style={{ alignSelf: "center", padding: 20 }} /> : null
                }} />
            {userDoesNotExists && <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
                <Text>{searchText} לא קיים</Text>
                <Button onPress={() => setShowCreateMemberModal(true)}>הוסף מנוי</Button>
            </View>}
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
                    },
                    onCompleted() {
                        show("המנוי נוצר בהצלחה", "success")
                        setShowCreateMemberModal(false);
                    },
                    onError(err) {
                        console.log(err)
                        show("אירעה שגיאה ביצירת המנוי", "error")
                    }
                })

            }} defaultPhoneNumberValue={searchText} onDismiss={() => setShowCreateMemberModal(false)} visible={showCreateMemberModal} />
        </View>
    );
}

export default CreateMemberSection;