"use client";
import EmptyHistory from "./components/EmptyHistory/EmptyHistory";
import HistoryList from "./components/HistoryList/HistoryList";
import { generateHistoryList } from "./utils/generateHistoryList";

const HistoryPage = (): React.ReactNode => {
  const historyList = generateHistoryList();
  if (!historyList) return null;
  return (
    <section>
      {historyList.length ? (
        <HistoryList historyList={historyList} />
      ) : (
        <EmptyHistory />
      )}
    </section>
  );
};

export default HistoryPage;
