import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Href, router, useSegments } from "expo-router"
import { PropsWithChildren, useEffect } from "react";
import { TouchableOpacity } from "react-native";

const breadcrumbsConvert = (segments: string[]) => {
    return segments.map((segment, index) => {
        const path = segments.slice(0, index + 1).join("/");
        return {
            path,
            title: segment
        }
    })
}

export const Breadcrumbs = ({ children }: PropsWithChildren) => {
    const nav = useSegments();
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {breadcrumbsConvert(nav).map(({ path, title }, index) => {
            return <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push(path as Href)}>
                    <Text>{title}</Text>
                </TouchableOpacity>
                {index !== breadcrumbsConvert(nav).length - 1 && <Text> / </Text>}
            </View>
        })}
    </View>
}