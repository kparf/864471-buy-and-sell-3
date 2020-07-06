'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {CommentService, OfferService} = require(`../data-service`);
const testData = require(`./test-data`);
const comment = require(`./comment`);


const router = new Router();
comment(router, new OfferService(testData), new CommentService(testData));

const server = createServer([
  `/api`,
  router,
]);

const comments = [
  {
    "id": "iys0l8",
    "text": "Совсем немного..."
  },
  {
    "id": "-zKxBM",
    "text": "Совсем немного..."
  },
  {
    "id": "dWhLUu",
    "text": "Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?"
  },
  {
    "id": "1QSyEX",
    "text": "С чем связана продажа? Почему так дешёво? Неплохо, но дорого Продаю в связи с переездом. Отрываю от сердца."
  },
  {
    "id": "-geZyM",
    "text": "А где блок питания? Вы что?! В магазине дешевле."
  },
  {
    "id": "Ws8CqO",
    "text": "Совсем немного..."
  },
  {
    "id": "zyW9uE",
    "text": "С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?"
  }
]

describe(`Category API`, () => {
  it(`When get comments status code should be 200`, async () => {
    const res = await request(server).get(`/api/offers/H7wbHN/comments`);
    expect(res.statusCode).toBe(200);
  });

  it(`When get comments response bosy should contains all comments`, async () => {
    const res = await request(server).get(`/api/offers/H7wbHN/comments`);
    expect(res.body).toEqual(comments);
  });

  it(`When get comments from not exist offere status code should be 404`, async () => {
    const res = await request(server).get(`/api/offers/NOT_EXIST_ID/comments`);
    expect(res.statusCode).toBe(404);
  });

  it(`When comment was added status code should be 200`, async () => {
    const res = await request(server)
      .post(`/api/offers/H7wbHN/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.statusCode).toBe(200);
  });

  it(`When comment was added reponse body should contains new comment with id`, async () => {
    const res = await request(server)
      .post(`/api/offers/H7wbHN/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`text`, `Тестовый комментарий!`);
  })

  it(`If try to add comment to not exit offer status should be 404`, async () => {
    const res = await request(server)
      .post(`/api/offers/NOT_EXIT_OFFER/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.statusCode).toBe(404);
  })
});