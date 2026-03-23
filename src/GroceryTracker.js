import { useState } from "react";
import { addItem } from "./services/GroceryService";

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleAdd = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      setSuccess("");
      return;
    }

    setLoading(true); // ✅ start loading

    addItem({
      itemName,
      quantity: Number(quantity),
      purchased: false
    })
      .then(() => {
        setItemName("");
        setQuantity("");
        setError("");
        setSuccess("Item added successfully!");

        // ✅ Auto hide success after 2 sec
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => {
        setError("Failed to add item");
        setSuccess("");
      })
      .finally(() => {
        setLoading(false); // ✅ stop loading
      });
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "60px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#fafafa"
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>🛒 Grocery Tracker</h3>

      {/* ❌ ERROR */}
      {error && (
        <p
          style={{
            color: "white",
            backgroundColor: "#dc3545",
            padding: "6px",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {error}
        </p>
      )}

      {/* ✅ SUCCESS */}
      {success && (
        <p
          style={{
            color: "white",
            backgroundColor: "#28a745",
            padding: "6px",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {success}
        </p>
      )}

      {/* INPUT - ITEM */}
      <input
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      {/* INPUT - QUANTITY */}
      <input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        disabled={loading}
        style={{
          width: "100%",
          padding: "9px",
          backgroundColor: loading ? "#999" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
    </div>
  );
}