export declare type ListUpdateAlgorithm = "autoMerge" | "directAppend" | "override" | undefined;
export declare type Setting = {
    maxInView_init?: number;
    increaseSize?: number;
    listUpdateAlgorithm?: ListUpdateAlgorithm;
    loadMoreFromExternal?: boolean;
    events?: {
        loading?: string | false;
        endOfList?: string | false;
        fullListUpdated?: string | false;
        listUpdated?: string | false;
    };
    loadMoreRetryInterval?: number;
};
export declare type CallBackFunction<ListItem> = () => Promise<ListItem[] | void>;
export declare type EventFireFunction = (eventName: string, details?: any) => void;
