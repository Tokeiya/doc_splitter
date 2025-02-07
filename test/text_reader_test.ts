import { TextReader } from '../src/text_reader';
import { suite, test } from 'mocha';
import { assert } from 'chai';
import { readFileSync } from 'fs';
import { OutOfTransactionError } from '../src/out_of_transaction_error';

function read_sample(path: string): string {
	return readFileSync(path, 'utf-8');
}

suite('TextReader', () => {
	test('ctor', () => {
		let str = read_sample('./test/sample_texts/simple_text');
		let fixture = new TextReader(str);

		assert.equal(fixture.source, str);
		assert.equal(fixture.transaction_depth, 0);
		assert.isUndefined(fixture.current);
	});

	test('source', () => {
		let scr = read_sample('./test/sample_texts/simple_text');
		let fixture = new TextReader(scr);

		assert.equal(fixture.source, scr);
	});

	test('next and current', () => {
		let fixture = new TextReader('abc');

		assert.isUndefined(fixture.current);

		assert.isTrue(fixture.next());
		assert.equal(fixture.current, 'a');

		assert.isTrue(fixture.next());
		assert.equal(fixture.current, 'b');

		assert.isTrue(fixture.next());
		assert.equal(fixture.current, 'c');

		assert.isFalse(fixture.next());
		assert.isUndefined(fixture.current);

		assert.isFalse(fixture.next());
		assert.isUndefined(fixture.current);
	});

	test('begin and commit', () => {
		let fixture = new TextReader('hello world');

		assert.equal(fixture.transaction_depth, 0);
		assert.equal(fixture.begin(), 1);

		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());

		assert.equal(fixture.commit(), 1);
		assert.equal(fixture.current, 'o');
		assert.equal(fixture.transaction_depth, 0);

		assert.equal(fixture.begin(), 1);
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());

		assert.equal(fixture.commit(), 1);
		assert.equal(fixture.current, 'd');
		assert.equal(fixture.transaction_depth, 0);

		assert.equal(fixture.begin(), 1);
		assert.isFalse(fixture.next());
		assert.equal(fixture.commit(), 1);
		assert.equal(fixture.transaction_depth, 0);
		assert.isUndefined(fixture.current);
	});

	test('invalid commit', () => {
		let fixture = new TextReader('abc');
		assert.throws(() => fixture.commit(), OutOfTransactionError);
	});

	test('simple rollback', () => {
		let fixture = new TextReader('abc def');

		assert.equal(fixture.begin(), 1);
		assert.equal(fixture.transaction_depth, 1);
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());

		assert.equal(fixture.begin(), 2);
		assert.equal(fixture.transaction_depth, 2);
		assert.equal(fixture.current, 'c');

		assert.isTrue(fixture.next());
		assert.isTrue(fixture.next());
		assert.equal(fixture.current, 'd');

		assert.equal(fixture.rollback(), 2);
		assert.equal(fixture.transaction_depth, 1);
		assert.equal(fixture.current, 'c');

		assert.isTrue(fixture.next());
		assert.equal(fixture.current, ' ');

		assert.isTrue(fixture.next());
		assert.equal(fixture.current, 'd');

		assert.equal(fixture.rollback(), 1);
		assert.equal(fixture.transaction_depth, 0);
		assert.isUndefined(fixture.current);
	});

	test('invalid rollback', () => {
		let fixture = new TextReader('abc');
		fixture.next();

		assert.throws(() => fixture.rollback(), OutOfTransactionError);
		assert.equal(fixture.current, 'a');
	});
});
