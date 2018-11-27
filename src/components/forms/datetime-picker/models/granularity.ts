const Granularity = {
    "time": "time",
    "day": "day",
    "month": "month"
};

type Granularity = (typeof Granularity)[keyof typeof Granularity];

export { Granularity };