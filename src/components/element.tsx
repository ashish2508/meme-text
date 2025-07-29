import React from 'react'
import { Checkbox } from './ui/checkbox';

interface ElementProps {
  s: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Element = ({ s, checked, onCheckedChange }: ElementProps) => {
  return (
    <div className="flex gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => {
          onCheckedChange(v as boolean);
        }}
        id={s}
      />
      <label
        htmlFor={s}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {s}
      </label>
    </div>
  )
}

export default Element
