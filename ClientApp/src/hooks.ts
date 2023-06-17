import { Dispatch, useState } from "react";

export function useObjectState<T>(initVal: T): [T, (prop: keyof T, val: any) => void, Dispatch<T>] {
  const [ state, setState ] = useState(initVal);
  const setter = (prop: keyof T, val: any) =>
      setState(prev => ({
        ...prev,
        [prop]: val
      }));
  return [ state, setter, setState ];
}