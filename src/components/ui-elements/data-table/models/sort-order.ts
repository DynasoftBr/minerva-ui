const SortDirection = {
    asc: "asc",
    desc: "desc"
};

type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export { SortDirection };