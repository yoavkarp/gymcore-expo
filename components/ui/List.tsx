import { useTheme } from "@/contexts/ThemeContext";
import { FlatList, FlatListProps, ListRenderItemInfo, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "./Text";
import { useEffect, useState } from "react";
import { Theme } from "@/theme";

interface ListItem {
    title: string;
    key: string;
}

const RenderListItem: React.FC<ListRenderItemInfo<ListItem> & Pick<TouchableOpacityProps, "onPress"> & { selected?: boolean }> = ({ item, selected, onPress }) => {
    const { theme } = useTheme();
    const _styles = styles(theme);

    return (
        <TouchableOpacity
            disabled={typeof (onPress) !== 'function'}
            style={[_styles.option, selected ? _styles.selectedValue : {}]}
            onPress={(e) => onPress?.(e)}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )
}

type ListProps = Partial<FlatListProps<ListItem>> & {
    items: ListItem[];
    onPressItem?: (item: ListItem) => any;
    defaultSelectedKey?: string;
}

const List: React.FC<ListProps> = ({ items, onPressItem, defaultSelectedKey }) => {

    const [selected, setSelected] = useState<ListItem | null>(items.find(item => item.key === defaultSelectedKey) || null);

    useEffect(() => {
        setSelected(items.find(item => item.key === defaultSelectedKey) || null);
    }, [defaultSelectedKey])

    const handlePress = (item: ListItem) => {
        setSelected(item);
        onPressItem?.(item);
    }

    return (
        <FlatList
            data={items}
            keyExtractor={item => item.key}
            renderItem={(info) => <RenderListItem
                {...info}
                selected={selected?.key === info.item.key}
                onPress={() => handlePress(info.item)}
            />
            }
        />
    );
}

const styles = (theme: Theme) => StyleSheet.create({
    container: {

    },
    comboBox: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 20,
        writingDirection: 'rtl',
        textAlign: 'right',
        color: theme.colors.text
    },
    modalBackground: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center'
    },
    modalContent: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 350
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary.toString() + "50",
    },
    selectedValue: {
        backgroundColor: theme.colors.primary.toString() + "20",
    }
});

export default List;
