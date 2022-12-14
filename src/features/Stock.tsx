import { useEffect } from "react";
import { cardAtom, stockState, wasteState } from "../game/state";
import { remainingDeck } from "../game/init";
import { useRecoilState, useRecoilCallback } from "recoil";

export const Stock = () => {
  const [stock, setStock] = useRecoilState(stockState);
  const [waste, setWaste] = useRecoilState(wasteState);

  const setAtom = useRecoilCallback(({ set }) => (card: Card) => {
    set(cardAtom(card.name), { ...card, turned: false });
  });

  useEffect(() => {
    remainingDeck.forEach((card: Card) => setAtom(card));
    setTimeout(() => {
      remainingDeck.forEach((card) => {
        const img = new Image();
        img.src = `./PNG-cards/${card.name}.png`;
      });
    }, 10);
  }, []);

  const pickCardsFromStock = () => {
    if (stock.length > 0) {
      const tempStock = [...stock];
      const tempWaste = [...waste];

      const hand = tempStock.splice(-3);
      setWaste([...tempWaste, ...hand]);
      setStock(tempStock);
    }
  };

  const restartStockPile = () => {
    const newStock: Card[] = [];
    const tempWaste = [...waste];
    tempWaste.reverse().forEach((card) => newStock.push(card));
    setWaste([]);
    setStock(newStock);
  };

  return (
    <div
      style={{
        width: "180px",
        height: "200px",
        margin: "1rem",
      }}
      onClick={pickCardsFromStock}
      draggable={false}
    >
      {stock.length > 0 ? (
        stock.map((card: Card, index: number) => (
          <img
            className="cardImg"
            src={"./PNG-cards/backside.png"}
            draggable={false}
            key={index}
            style={{
              marginLeft: `${-index * 0.4}px`,
              marginTop: `${-index * 0.6}px`,
              position: "absolute",
              border: "0.1px solid gray",
              borderRadius: "0.7rem",
              width: "138px",
              height: "200px",
            }}
          />
        ))
      ) : (
        <img
          className="cardImg"
          src={"./PNG-cards/empty.png"}
          draggable={false}
          onClick={restartStockPile}
          style={{
            border: "0.1px solid gray",
            borderRadius: "0.7rem",
            width: "135px",
            height: "200px",
          }}
        />
      )}
    </div>
  );
};
