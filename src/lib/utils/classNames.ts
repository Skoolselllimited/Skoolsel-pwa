import { isString } from "./types";

export function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).filter(isString).join(" ");
}

export default classNames;
