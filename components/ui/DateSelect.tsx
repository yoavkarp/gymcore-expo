import Select from "@/components/ui/Select";
import { FunctionComponent, useMemo, useState } from 'react';
import { View } from "react-native";
import Text from "./Text";

interface DateSelectProps {
    isoDate?: string;
    onChange?: (isoDate: string) => any;
}

interface DayPickerProps {
    date?: Date;
    onChange?: (date: number) => any;
}

interface MonthPickerProps {
    date?: Date;
    onChange?: (month: number) => any;
}

interface YearPickerProps {
    date?: Date;
    onChange?: (year: number) => any;
}

export const DayPicker: FunctionComponent<DayPickerProps> = ({ date = new Date(), onChange }) => {

    const days = useMemo(() => {
        const lastDay = new Date(new Date().getFullYear(), date.getMonth() + 1, 0).getDate();
        return Array.from({ length: lastDay }).map((_, i) => `0${i + 1}`.slice(-2));
    }, [date]);

    return (
        <Select containerStyle={{ width: 100 }} defaultValue={`0${date.getDate()}`.slice(-2)} onChangeValue={(val) => {
            onChange?.(parseInt(val.value));
        }} items={days.map((day) => ({ value: day, title: day }))}

        />
    );
}

const months = Array.from({ length: 12 }).map((_, i) => `0${i + 1}`.slice(-2));

export const MonthPicker: FunctionComponent<MonthPickerProps> = ({ date = new Date(), onChange }) => {
    return (
        <Select containerStyle={{ width: 100 }} defaultValue={`0${date.getMonth() + 1}`.slice(-2)} onChangeValue={(val) => {
            onChange?.(parseInt(val.value) - 1);
        }} items={months.map((month) => ({ value: `0${month}`.slice(-2), title: month }))}
        />
    );
}

export const YearPicker: FunctionComponent<YearPickerProps> = ({ date = new Date(), onChange }) => {
    return (
        <Select containerStyle={{ width: 100 }} defaultValue={date.getFullYear().toString()} onChangeValue={(val) => {
            onChange?.(parseInt(val.value));
        }} items={Array.from({ length: 100 }).map((_, i) => ({ value: (new Date().getFullYear() - i).toString(), title: (new Date().getFullYear() - i).toString() }))}
        />
    );
}

const DateSelect: FunctionComponent<DateSelectProps> = ({ isoDate = new Date().toISOString().substring(0, 10), onChange }) => {

    const [date, setDate] = useState(new Date(isoDate));

    return (
        <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' }}>
            <DayPicker date={date} onChange={(_date) => {
                const newDate = new Date(new Date(date).setDate(_date))
                setDate(newDate);
                onChange?.(newDate.toISOString().substring(0, 10));
            }} />
            <Text>/</Text>
            <MonthPicker date={date} onChange={(month) => {
                const newDate = new Date(new Date(date).setMonth(month));
                setDate(newDate);
                onChange?.(newDate.toISOString().substring(0, 10));
            }} />
            <Text>/</Text>
            <YearPicker date={date} onChange={(year) => {
                const newDate = new Date(new Date(date).setFullYear(year));
                setDate(newDate);
                onChange?.(newDate.toISOString().substring(0, 10));
            }} />
        </View>
    );
}

export default DateSelect;