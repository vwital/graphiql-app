import { HistoryItem } from "../types";

const generateHistoryList = (): HistoryItem[] | null => {
  const historyList: HistoryItem[] = [];
  if (typeof localStorage === "undefined") return null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("history")) {
      const value = localStorage.getItem(key);
      historyList.push(JSON.parse(value as string));
    }
  }
  return historyList;
};

export { generateHistoryList };
