import * as assert from 'node:assert';
import { InvalidSizeError, InvalidIndex } from './invalid_size';

class IndexController {
	private readonly _size: number;
	private readonly _mask: number;

	private _pivot: number;

	public constructor(size: number) {
		if (size <= 0) {
			throw new InvalidSizeError();
		}

		let tmp = Math.log2(size);
		let int = Math.floor(tmp);

		if (tmp != int) {
			int += 1;
		}

		if (int >= 16) {
			throw new InvalidSizeError();
		}

		this._pivot = 0;
		this._size = Math.pow(2, int);
		this._mask = this._size - 1;
	}

	public convert_idx(index: number): number | undefined {
		if (index < 0 && index >= this._size) return undefined;
		return (index + this._pivot) & this._mask;
	}

	public set pivot(idx: number) {
		if (idx<0 && idx>=this._mask) throw
	}

	public get pivot(): number {
		throw new Error('Not implemented');
	}

	public next_size(): IndexController | undefined {
		throw new Error('Not implemented');
	}

	public shrink_size(): IndexController | undefined {
		throw new Error('Not implemented');
	}
}

export class Dequeue<T> {
	private _capacity: number = 0;
	private _length: number = 0;
	private _pivot: number = 0;
	private _storage: Array<T> = [];

	public constructor() {
		throw new Error('Not implemented');
	}

	public get length(): number {
		throw new Error('Not implemented');
	}

	public push(value: T): void {
		throw new Error('Not implemented');
	}

	public push_back(value: T): void {
		throw new Error('Not implemented');
	}

	public pop(): T | undefined {
		throw new Error('Not implemented');
	}

	public dequeue(): T | undefined {
		throw new Error('Not implemented');
	}

	public get(index: number): T | undefined {
		throw new Error('Not implemented');
	}
}
