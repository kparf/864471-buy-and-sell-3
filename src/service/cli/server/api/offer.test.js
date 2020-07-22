'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {OfferService} = require(`../data-service`);
const testData = require(`./test-data`);
const offer = require(`./offer`);


const router = new Router();
offer(router, new OfferService(testData));

const server = createServer([
  `/api`,
  router,
]);


describe(`Offer API`, () => {
  it(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });


  it(`when get existent offer by id status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers/H7wbHN`);
    expect(res.statusCode).toBe(200);
  });

  it(`when get not existent offer by id status code should be 404`, async () => {
    const res = await request(server).get(`/api/offers/NOT_EXITED_OFFER`);
    expect(res.statusCode).toBe(404);
  });

  it(`When offer was added response body should contains new offer with id`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({
        "category": [
          "Игры",
          "Журналы",
          "Электроника"
        ],
        "description": "TEST_DESCRIPTION",
        "picture": "item12.jpg",
        "title": "Продам книги Стивена Кинга.",
        "type": "sale",
        "sum": 15423,
        "comments": [
          {
            "id": "InpFpV",
            "text": "Совсем немного... С чем связана продажа? Почему так дешёво?"
          },
          {
            "id": "oLZfmX",
            "text": "Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Неплохо, но дорого"
          }
        ]
      });
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`category`);
    expect(res.body).toHaveProperty(`description`, `TEST_DESCRIPTION`);
    expect(res.body).toHaveProperty(`picture`, `item12.jpg`);
    expect(res.body).toHaveProperty(`title`, `Продам книги Стивена Кинга.`);
    expect(res.body).toHaveProperty(`type`, `sale`);
    expect(res.body).toHaveProperty(`sum`, 15423);
    expect(res.body).toHaveProperty(`comments`);
  });

  it(`When offer was added status code should be 200`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({
        "category": [
          "Игры",
          "Журналы",
          "Электроника"
        ],
        "description": "TEST_DESCRIPTION",
        "picture": "item12.jpg",
        "title": "Продам книги Стивена Кинга.",
        "type": "sale",
        "sum": 15423,
        "comments": [
          {
            "id": "InpFpV",
            "text": "Совсем немного... С чем связана продажа? Почему так дешёво?"
          },
          {
            "id": "oLZfmX",
            "text": "Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Неплохо, но дорого"
          }
        ]
      });
    expect(res.statusCode).toBe(200);
  });

  it(`When offer was updated status code should be 200 `, async () => {
    const res = await request(server)
      .put(`/api/offers/H7wbHN`)
      .send({
        "title": "Уиии.... Как достигнуть успеха не вставая с кресла",
      });
      expect(res.statusCode).toBe(200);
  })

  it(`if try to update not existed offer status code should be 404 `, async () => {
    const res = await request(server)
      .put(`/api/offers/NOT_EXITED_OFFER`)
      .send({
        "title": "Уиии.... Как достигнуть успеха не вставая с кресла",
      });
      expect(res.statusCode).toBe(404);
  })

  it(`When offer was deleted status code should be 200 `, async () => {
    const res = await request(server)
      .delete(`/api/offers/H7wbHN`);
      expect(res.statusCode).toBe(200);
  })

  it(`if try to delete not existed offer status code should be 404 `, async () => {
    const res = await request(server)
      .delete(`/api/offers/NOT_EXITED_OFFER`);
      expect(res.statusCode).toBe(404);
  })
});