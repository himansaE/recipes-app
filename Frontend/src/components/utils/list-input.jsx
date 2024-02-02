import TextField from "@mui/material/TextField";
import { useState } from "react";
import { MdiMinusCircleOutline, MdiPlusCircle } from "./icons";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
export const ListInput = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const setValue = () => {
    if (name.trim() != "" && amount.trim() != "") {
      props.onChange([...props.value, { name, amount }]);
      setAmount("");
      setName("");
    }
  };
  return (
    <div>
      <div className="my-5">
        {props.value.map((i, n) => {
          return (
            <div
              key={i.name + i.amount}
              className="flex px-2 bg-indigo-50/50 hover:bg-indigo-50/100 transition-colors items-center py-2 my-2 mx-2 rounded-md gap-2 text-sm"
            >
              <div className="flex gap-x-2 sm:items-end items-start flex-col sm:flex-row">
                <div>{i.name}</div>
                <div className="text-xs sm:mx-0 mx-4 text-black/80">
                  {i.amount}
                </div>
              </div>
              <div className="ml-auto">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    props.onChange(props.value.filter((_, _i) => _i !== n));
                  }}
                >
                  <MdiMinusCircleOutline />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-[0.7fr_0.3fr] gap-3">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={props.disabled}
        />
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={props.disabled}
          onKeyUp={(e) => {
            // when press enter item added to list
            if (e.key === "Enter") {
              e.preventDefault();
              setValue();
            }
          }}
        />
      </div>
      <Button
        variant="text"
        startIcon={<MdiPlusCircle />}
        className="!my-3"
        disabled={props.disabled}
        onClick={(e) => {
          e.preventDefault();
          setValue();
        }}
      >
        Add Ingredient
      </Button>
    </div>
  );
};
