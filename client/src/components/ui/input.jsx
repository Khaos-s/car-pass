import * as React from "react";
import { cn } from "./utils.jsx";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-base md:text-sm",
        "placeholder:text-muted-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "transition-[color,box-shadow] outline-none dark:bg-input/30",
        className
      )}
      {...props}
    />
  );
}

export { Input };
