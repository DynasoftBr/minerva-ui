const ViewMode = {
    "month": "month",
    "year": "year",
    "decade": "decade",
    "century": "century"
};

type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];

export { ViewMode };