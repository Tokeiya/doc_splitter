export interface TextStream {
    get source(): String;

    next(): boolean;

    get current(): string | undefined;

    begin(): Number;

    commit(): Number;

    rollback(): Number;

    get transaction_depth(): Number;
}

