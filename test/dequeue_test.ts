import { Dequeue } from '../src/dequeue';
import { suite, test, describe, it } from 'mocha';
import { assert as chai } from 'chai';

suite('dequeue', () => {
	test('ctor', () => {
		let fixture = new Dequeue();
		chai.equal(fixture.length, 0);
		chai.isUndefined(fixture.get(0));
	});

	test('length', () => {
		let fixture = new Dequeue();

		for (let i: number = 0; i < 10; i++) {
			fixture.push(i);
			chai.equal(fixture.length, i);

			fixture.push(i + 10);
			chai.equal(fixture.length, i + 1);

			fixture.push_back(i);
			chai.equal(fixture.length, i + 2);

			fixture.pop();
			chai.equal(fixture.length, i + 1);

			fixture.dequeue();
			chai.equal(fixture.length, i);
		}
	});

	test('push and pop', () => {
		let fixture = new Dequeue();

		fixture.push(1);
		fixture.push(2);

		chai.equal(fixture.pop(), 2);

		fixture.push_back(100);

		chai.equal(fixture.pop(), 1);
		chai.equal(fixture.pop(), 100);

		chai.isUndefined(fixture.pop());
	});

	test('push and dequeue', () => {
		let fixture = new Dequeue();

		fixture.push(1);
		fixture.push(2);

		chai.equal(fixture.dequeue(), 2);

		fixture.push_back(100);
		chai.equal(fixture.dequeue(), 100);

		chai.equal(fixture.dequeue(), 1);
		chai.isUndefined(fixture.dequeue());
	});

	test('complex test', () => {
		let fixture = new Dequeue();
	});

	test('get test', () => {
		let fixture = new Dequeue();

		//[0]
		fixture.push(0);

		//[0,1]
		fixture.push(1);

		//[20,0,1]
		fixture.push_back(20);

		chai.equal(fixture.get(0), 20);
		chai.equal(fixture.get(1), 0);
		chai.equal(fixture.get(2), 1);
		chai.isUndefined(fixture.get(3));
	});
});
