const RootPage = (): React.ReactNode => {
  setTimeout(() => {
    throw new Error("Something wrong");
  }, 5000);

  return <h2>Welcome page</h2>;
};

export default RootPage;
