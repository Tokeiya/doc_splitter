import {TextStream} from "./text_stream"
import {OutOfTransactionError} from "./out_of_transaction_error";

export class TextReader implements TextStream {
    private _source: string;
    private _idx: number;
    private _transaction: number[];

    public constructor(source: string) {
        this._source = source;
        this._idx = -1;
        this._transaction = [];
    }

    get current(): string | undefined {
        if ((this._idx == -1) || (this._source.length <= this._idx)) {
            return undefined;
        }

        return this._source[this._idx]
    }

    get source(): String {
        return this._source;
    }

    next(): boolean {
        this._idx += 1;
        return this._source.length > this._idx
    }

    begin(): Number {
        this._transaction.push(this._idx);
        return this._transaction.length;
    }

    commit(): Number {
        if (this._transaction.length == 0) {
            throw new OutOfTransactionError()
        }

        this._transaction.pop();
        return this._transaction.length + 1;
    }

    rollback(): Number {
        let i = this._transaction.pop();

        switch (i) {
            case undefined:
                throw new OutOfTransactionError();
            default:
                this._idx = i;
                return this._transaction.length + 1;
        }
    }

    get transaction_depth(): Number {
        return this._transaction.length;
    }
}