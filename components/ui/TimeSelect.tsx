import Select from "@/components/ui/Select";
import { FunctionComponent, useMemo, useState } from 'react';
import Text from "./Text";
import { View } from "./View";
import { viewLayout } from "./utils/localeLayout";

interface TimeSelectProps {
    isoDate?: string;
    onChange?: (isoDate: string) => any;
}

interface HourPickerProps {
    date?: Date;
    onChange?: (date: number) => any;
}

interface MinutePickerProps {
    date?: Date;
    onChange?: (month: number) => any;
}

const hours = Array.from({ length: 24 }).map((_, i) => `0${i}`.slice(-2));


export const HourPicker: FunctionComponent<HourPickerProps> = ({ date = new Date(), onChange }) => {

    return (
        <Select containerStyle={{ width: 100 }} defaultValue={`0${date.getHours()}`.slice(-2)}
            onChangeValue={(val) => {
                onChange?.(parseInt(val.value));
            }} items={hours.map((hour) => ({ value: hour, title: hour }))}

        />
    );
}

const minutes = Array.from({ length: 60 }).map((_, i) => `0${i}`.slice(-2));

export const MinutePicker: FunctionComponent<MinutePickerProps> = ({ date = new Date(), onChange }) => {
    return (
        <Select
            containerStyle={{ width: 100 }}
            defaultValue={`0${date.getMinutes()}`.slice(-2)}
            onChangeValue={(val) => {
                onChange?.(parseInt(val.value));
            }}
            items={minutes.map((minute) => ({ value: `0${minute}`.slice(-2), title: minute }))}
        />
    );
}

const TimeSelect: FunctionComponent<TimeSelectProps> = ({ isoDate = new Date().toISOString().substring(10), onChange }) => {

    const [date, setDate] = useState(new Date(isoDate));

    return (
        <View style={viewLayout({ gap: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', flexDirection: 'row-reverse' })}>
            <HourPicker date={date} onChange={(_date) => {
                const newDate = new Date(new Date(date).setDate(_date))
                setDate(newDate);
                onChange?.(newDate.toISOString().substring(0, 10));
            }} />
            <Text>:</Text>
            <MinutePicker date={date} onChange={(month) => {
                const newDate = new Date(new Date(date).setMonth(month));
                setDate(newDate);
                onChange?.(newDate.toISOString().substring(0, 10));
            }} />
        </View>
    );
}

export default TimeSelect;