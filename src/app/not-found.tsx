"use client";
import "@/assets/styles/main.scss";
import NotFoundGeneral from "@/components/pages/notFound/NotFoundGeneral";

const NotFound = (): React.ReactNode => {
  return (
    <html lang="en">
      <body>
        <main className="main">
          <NotFoundGeneral />
        </main>
      </body>
    </html>
  );
};

export default NotFound;
