// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from "react";
import { useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [to, setTo] = useState("EUR");
  const [from, setFrom] = useState("USD");
  const [convertAmount, setConvertAmount] = useState();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCurrencyConverter() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          {
            signal: controller.signal,
          }
        );
        if (res.ok) {
          const data = await res.json();
          setConvertAmount(data.rates[to]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (to === from) {
      setConvertAmount(amount);
      return;
    }
    fetchCurrencyConverter();
    return () => {
      controller.abort();
    };
  }, [amount, to, from]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onInput={(e) => setAmount(Number(e.target.value))}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <opton value="INR">INR</opton>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {convertAmount} {to}
      </p>
    </div>
  );
}
