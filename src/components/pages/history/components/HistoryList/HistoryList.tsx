"use client";
import { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

const HistoryList = (): React.ReactNode => {
  const historyList = useSelector((state: RootState) => state.history);
  if (!historyList.length) return null;

  return <div>HistoryList</div>;
};

export default HistoryList;
