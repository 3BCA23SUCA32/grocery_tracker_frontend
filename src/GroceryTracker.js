import { useState } from "react";

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItem = () => {
    fetch("http://localhost:8080/api/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itemName: itemName,
        quantity: Number(quantity),
        purchased: false
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <>
      <input onChange={e => setItemName(e.target.value)} />
      <input type="number" onChange={e => setQuantity(e.target.value)} />
      <button onClick={addItem}>Add</button>
    </>
  );
}
