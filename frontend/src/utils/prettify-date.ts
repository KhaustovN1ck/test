import {DateTime} from 'luxon';

export enum DateFormat {
    Short,
    LocalDateTime
}

export const prettifyDate = (date: string, toFormat: DateFormat = DateFormat.LocalDateTime) => {

    const dt = DateTime.fromISO(date).plus({minutes: DateTime.local().offset})
    if(toFormat === DateFormat.LocalDateTime) {
        return dt.toLocaleString(DateTime.DATETIME_MED);
    } else {
        return dt.toLocaleString();
    }
}