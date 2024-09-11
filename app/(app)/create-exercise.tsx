import { useSession } from "@/auth";
import Combobox from "@/components/Combobox";
import { useEffect, useState, useTransition } from "react";
import { I18nManager, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import exercisesJson from '@/assets/exercises.json'

function getTopMatches(input: string, sentences: string[], topN?: number) {
    // Split the input string into words
    const inputWords = input.toLowerCase().split(/\s+/);

    // Use reduce to generate the matches array
    const matches = sentences.reduce<{ sentence: string, matchCount: number }[]>((acc, sentence) => {
        // Split the sentence into words
        const sentenceWords = sentence.toLowerCase().split(/\s+/);

        // Count the number of matching words using every
        const matchCount = inputWords.filter(word =>
            sentenceWords.some(sentenceWord => sentenceWord.includes(word))
        ).length;

        // Add the sentence with its match count to the accumulator
        acc.push({ sentence, matchCount });
        return acc;
    }, []); // Start with an empty accumulator array

    // Sort the matches by the number of matches in descending order
    matches.sort((a, b) => b.matchCount - a.matchCount);

    // Return the top N matches
    return matches.slice(0, topN).map(match => match.sentence);
}


const againstmap: any = {
    barble: "מוט",
    dumbbells: "משקולות",
    machine: "מכונה",
    cable: "כבל",
    bodyWeight: "משקל גוף",
    olympicBarble: "מוט אולימפי",
    plate: "צלחת",
    rubberBand: "גומיה",
    wBarble: "מוט W",
}


const Index = () => {

    const [text, setText] = useState<string>('');
    const [data, setData] = useState<string[]>([])

    useEffect(() => {
        // Set a timeout to update the search query
        const handler = setTimeout(() => {
            const items = getTopMatches(text, exercisesJson.strength.map((ex) => `${ex.name.he} כנגד ${againstmap[ex.against]}`))
            setData(items)
        }, 500); // Delay (in milliseconds)

        // Cleanup function: clear the timeout if input changes before the delay is over
        return () => {
            clearTimeout(handler);
        };
    }, [text]);

    return (
        <SafeAreaView style={{ alignItems: 'flex-start' }}>
            {/* <TextInput onChange={(e) => setPhoneNumber(e.nativeEvent.text)} style={{ width: 200 }} /> */}
            {/* <Button onPress={async () => {
                await createMember({
                    variables: { input: { phone_number: `+972${phoneNumber}` } }
                })
                console.log(phoneNumber)
            }}>Create Member</Button> */}
            <Combobox onChangeText={setText} data={data} />
        </SafeAreaView>
    );
}

export default Index;