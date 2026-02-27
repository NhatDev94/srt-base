"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, RootState } from "@/lib/redux/store";

export default function ReduxProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: Partial<RootState>;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}