export type User = { userID: string; hashedPassword: string; email: string };
export type Session = {
  sessionID: string;
  userID: string;
  sessionKey: string;
  deviceName: string;
};
export type Card = {
  cardID: string;
  userID: string;
  cardTitle: string;
  cardBody: string;
};
export type CardTag = {
  cardTagID: string;
  cardID: string;
  tagName: string;
};

export interface IModel {
  createUser(email: string, hashedPassword: string): Promise<void>;
  getUser(email: string): Promise<void | User>;

  createSession(
    userID: string,
    sessionKey: string,
    deviceName: string
  ): Promise<void>;
  getSessionByKey(sessionKey: string): Promise<void | Session>;
  getSessionsByUserID(userID: string): Promise<Session[]>;
  deleteSession(sessionID: string): Promise<void>;

  createCard(userID: string, title: string, body: string): Promise<Card>;
  getCardsByUserID(userID: string): Promise<Card[]>;
  updateCard(cardID: string, title?: string, body?: string): Promise<Card>;
  deleteCard(cardID: string): Promise<void>;

  createCardTag(cardID: string, name: string): Promise<CardTag>;
  getCardTagsByUserID(userID: string): Promise<CardTag[]>;
  deleteCardTag(cardTagID: string): Promise<void>;
}
