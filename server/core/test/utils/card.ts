import supertest from "supertest";

export const getCards = (server: any, key: string) =>
  supertest(server)
    .get("/card")
    .set("Authorization", `Bearer ${key}`);

export const newCard = (
  server: any,
  key: string,
  title: string,
  text: string,
  tag_ids: string[]
) =>
  supertest(server)
    .post("/card/new")
    .send({ title, text, tag_ids })
    .set("Authorization", `Bearer ${key}`);

export const updateCard = (
  server: any,
  key: string,
  card: { card_id: string; title: string; text: string; tag_ids: string[] }
) =>
  supertest(server)
    .post("/card/update")
    .send({ card })
    .set("Authorization", `Bearer ${key}`);

export const deleteCard = (server: any, key: string, card_id: string) =>
  supertest(server)
    .post("/card/delete")
    .send({ card_id })
    .set("Authorization", `Bearer ${key}`);
