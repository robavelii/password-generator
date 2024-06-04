import { useEffect, useRef, useState } from "react";
import {
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { Toaster, toast } from "sonner";

import { characters } from "./constants";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generate = () => {
    let generatePassword = "";
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * characters.length);
      generatePassword += characters.substring(random, random + 1);
    }
    setPassword(generatePassword);
  };

  const handleGenerateClick = () => {
    generate();
  };
  const handleCopyClick = () => {
    if (password.length < 6) {
      toast.error("Password length should be at least 6 characters");
    } else {
      navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Password copied successfully!");
    }
  };

  const handleClearClick = () => {
    setPassword("");
    setCopied(false);
    toast.success("Password cleared!!");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="w-screen flex justify-center items-center gap-5">
        <div className="px-12 py-12 sm:px-20 max-w-5xl flex gap-4 flex-wrap justify-evenly">
          <h1 className="text-3xl md:text-4xl font-bold w-full text-center mb-2 text-blue-600 text-balance">
            Password Generator{" "}
          </h1>
          <p className="text-xm w-full text-center text-blue-600 mb-6">
            Use this app at your own discretion.
          </p>
          <TextField
            ref={inputRef}
            id="length"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            InputProps={{
              inputProps: { min: 6, max: 36 },
            }}
            variant="outlined"
            className="text-white"
            type="number"
          />
          <Button
            onClick={handleGenerateClick}
            variant="contained"
            className="bg-blue-600 h-14 leading-normal"
          >
            Generate Password
          </Button>
          <OutlinedInput
            id="password"
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <FaRegCopy
                  className="text-gray-600 cursor-pointer"
                  onClick={handleCopyClick} // Move this to the input field
                />
                <span className="mx-2">
                  <MdClear
                    className="text-gray-600 cursor-pointer"
                    onClick={handleClearClick}
                  />
                </span>
              </InputAdornment>
            }
            readOnly
            className="text-white"
          />

          {copied && (
            <p className="w-full text-center text-green-500 text-sm">
              Password copied successfully!
            </p>
          )}

          <p className="text-s w-full text-center mt-6 text-blue-500">
            Made By{" "}
            <a
              href="https://github.com/robavelii"
              target="_blank"
              className="text-gray-900 hover:bg-gray-600"
            >
              Robel Fekadu
            </a>{" "}
            ~ {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
