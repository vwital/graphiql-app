import EmptyHistory from "./components/EmptyHistory/EmptyHistory";
import HistoryList from "./components/HistoryList/HistoryList";

const HistoryPage = (): React.ReactNode => {
  return (
    <section>
      <EmptyHistory />
      <HistoryList />
    </section>
  );
};

export default HistoryPage;
