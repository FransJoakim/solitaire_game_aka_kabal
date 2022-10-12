import { atom, atomFamily } from "recoil";
import { remainingDeck } from "./init";

const defaultValue = {
  name: "",
  subsidiary: null,
  value: null,
  color: null,
  suite: null,
};

export const cardAtom = atomFamily<Card, string>({
  key: "card",
  default: defaultValue,
});

export const stockState = atom<Card[]>({
  key: "stock",
  default: remainingDeck,
});

export const wasteState = atom<Waste>({
  key: "waste",
  default: [],
});
