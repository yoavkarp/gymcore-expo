import { Gender, Member } from "@/appsync/API";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Maybe } from "@/graphql";
import { calculateAge } from "@/utils/calculate-age";

const ageToText: Record<Gender, string> = {
    'MALE': 'זכר',
    'FEMALE': 'נקבה',
    "OTHER": 'אחר'
}

interface MemberDetailsCardProps {
    member?: DeepPartial<Member>;
}

const MemberDetailsCard: React.FC<MemberDetailsCardProps> = ({ member }) => {

    return (
        <Card style={{ flexDirection: 'row', gap: 40, alignItems: 'center', shadowOpacity: 0, elevation: 2 }}>
            <View>
                <Label center>שם מלא</Label>
                <Text center>{member?.name}</Text>
            </View>

            <View>
                <Label center>טלפון</Label>
                <Text center>{member?.phone_number?.slice(4)}</Text>
            </View>

            {member?.email && <View>
                <Label center>אימייל</Label>
                <Text center>{member?.email}</Text>
            </View>}

            <View>
                <Label center>מין</Label>
                <Text center>{ageToText[member?.gender as Gender]}</Text>
            </View>

            <View>
                <Label center>גיל</Label>
                <Text center>{calculateAge(new Date(member?.birthdate!))}</Text>
            </View>

            {member?.address && <View>
                <Label center>כתובת</Label>
                <Text center>{member?.address}</Text>
            </View>}

            <View>
                <Label center>ת. הצטרפות</Label>
                <Text center>{new Date(member?.created_at!).toLocaleDateString()}</Text>
            </View>
        </Card>

    );
}

export default MemberDetailsCard;