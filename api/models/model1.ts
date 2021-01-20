"use strict";

import {verbose} from "sqlite3";
import * as faker from "faker";
import * as test from "tape";

const sqlite3 = verbose();
const db = new sqlite3.Database(':memory:');

// @ts-ignore
const insert = (stmt, firstName, lastName, age, index): Promise<void> => new Promise((resolve, reject) => {
    setTimeout(() => {
        stmt.run(firstName, lastName, age);
        console.log(index);
        console.log('insert');
        resolve();
    }, index * 100)
});

// @ts-ignore
const each = (db): Promise<void> => new Promise((resolve, reject) => {
    setTimeout(() => {
        db.each("SELECT * FROM table1", (err, row) => {
            console.log(row);
        });
        resolve();
    }, 1000)
});

const initTests = (db) => {
    db.all("SELECT COUNT(*) FROM table1", (err, [{ 'COUNT(*)': count }]) => {
        test('Column Count Test', function (t) {
            t.plan(1);

            t.equal(count, 10);
        });
    });
    db.close();
}

// @ts-ignore
db.serialize(async () => {
    db.run("CREATE TABLE table1 (firstName TEXT, lastName TEXT, age INTEGER)");

    const stmt = db.prepare("INSERT INTO table1 VALUES (?, ?, ?)");
    const promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(insert(stmt, faker.name.firstName(), faker.name.lastName(), faker.random.number({
            min: 20,
            max: 50
        }), i));
    }

    // @ts-ignore
    await Promise.all(promises);
    stmt.finalize();

    await each(db);
    initTests(db);
});

