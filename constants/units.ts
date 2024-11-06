export const REPS_UNITS = [
    {
        value: "reps",
        title: "חזרות"
    },
    {
        value: "max",
        title: "מקסימום חזרות"
    },
    {
        value: "minutes",
        title: "דקות"
    },
    {
        value: "seconds",
        title: "שניות"
    }
]

export const WEIGHT_UNITS = [
    {
        value: "kg",
        title: "ק״ג"
    },
    {
        value: "kg_side",
        title: "ק״ג כל צד"
    },
    {
        value: "lbs",
        title: "פאונד"
    },
    {
        value: "lbs_hand",
        title: "פאונד כל צד"
    },
    {
        value: "max",
        title: "מקסימום"
    },
    {
        value: "body",
        title: "משקל גוף"
    },
]

export const REST_UNITS = [
    {
        value: "seconds",
        title: "שניות"
    },
    {
        value: "minutes",
        title: "דקות"
    },
    {
        value: "hours",
        title: "שעות"
    }
]

export const DISTANCE_UNITS = [
    {
        value: "meter",
        title: "מטר"
    },
    {
        value: "km",
        title: "קילומטר"
    }
]

export const TEMPO_UNITS = [
    {
        value: "meter/minute",
        title: "מטר לדקה"
    },
    {
        value: "km/h",
        title: "קמ״ש"
    },
    {
        value: "machine",
        title: "קצב מכונה"
    },
    {
        value: "mph",
        title: "מייל לשעה"
    }
]

export const MORE_UNITS = [
    {
        value: "%",
        title: "%"
    },
    {
        value: "BPM",
        title: "BPM"
    }
]

export const ALL_UNITS = REPS_UNITS.concat(WEIGHT_UNITS).concat(REST_UNITS).concat(DISTANCE_UNITS).concat(TEMPO_UNITS).concat(MORE_UNITS);