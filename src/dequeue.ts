export class Dequeue<T> {
    private _capacity: number = 0;
    private _length: number = 0;
    private _pivot: number = 0;
    private _storage: Array<T> = [];


    public constructor() {
        throw new Error("Not implemented");
    }

    public get length(): number {
        throw new Error("Not implemented");
    }

    public push(value: T): void {
        throw new Error("Not implemented");
    }

    public push_back(value: T): void {
        throw new Error("Not implemented");
    }

    public pop(): T | undefined {
        throw new Error("Not implemented");
    }

    public dequeue(): T | undefined {
        throw new Error("Not implemented");
    }

    public get(index: number): T {
        throw new Error("Not implemented");
    }


}

