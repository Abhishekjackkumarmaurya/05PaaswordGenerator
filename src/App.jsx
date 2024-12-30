import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

   // Use useRef hook
   const passportRef = useRef(null);

  // Corrected password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "[]{}#$%^&*()!~`";

    for (let i = 0; i < length; i++) { // Ensure loop runs `length` times
      let char = Math.floor(Math.random() * str.length); // Ensure valid index
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed ,setPassword]);


  const copyPasswordToClipBoard = useCallback(()=>{
    passportRef.current?.select()

    passportRef.current?.setSelectionRange(0, 20) // to set how long you pass want to copy

    window.navigator.clipboard.writeText(Password)
  },
  [Password])

  // UseEffect to generate password when dependencies change
  useEffect(() => {
    passwordGenerator(); // Call the generator function
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="bg-gray-600 rounded-xl shadow-2xl shadow-white">
        <h1 className="m-2 p-4">Password Generator</h1>
        <div className="flex justify-center p-4 ">
          <input
            type="text"
            value={Password}
            readOnly
            ref={passportRef}
            className="bg-white text-black text-wrap text-xl px-1 rounded-tl-xl rounded-bl-xl h-10 w-full"
            placeholder="Password"
          />
          <button
            onClick={copyPasswordToClipBoard}                // or onClick={() => navigator.clipboard.writeText(Password)}

            className="max-h-10 text-large rounded-none rounded-tr-xl rounded-br-xl  border-none"
            style={{ backgroundColor: "black" }}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center justify-center text-nowrap px-2 py-4 gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer bg-gray-600 "
              onChange={(e) => {
                setLength(Number(e.target.value)); // Ensure value is a number
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
