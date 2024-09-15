import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HistoryPage from "@/components/pages/history/HistoryPage";
import { IntlProviderWrapper } from "@/tests/utils/test-utils";
import HistoryList from "@/components/pages/history/components/HistoryList/HistoryList";
import { HistoryItem } from "@/components/pages/history/types";
import { generateHistoryList } from "@/components/pages/history/utils/generateHistoryList";

vi.mock("next/image", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("HistoryPage", () => {
  it("renders EmptyHistory when no history list", () => {
    const { getByText } = render(
      <IntlProviderWrapper>
        <HistoryPage />
      </IntlProviderWrapper>
    );

    expect(
      getByText("You haven't executed any requests. Try:")
    ).toBeInTheDocument();
  });

  it("renders a list of history items", () => {
    const historyList: HistoryItem[] = [
      { href: "/test-url-1", method: "GET", url: "https://example1.com" },
      { href: "/test-url-2", method: "POST", url: "https://example2.com" },
    ];

    render(
      <IntlProviderWrapper>
        <HistoryList historyList={historyList} />
      </IntlProviderWrapper>
    );

    expect(screen.getByText("GET")).toBeInTheDocument();
    expect(screen.getByText("https://example1.com")).toBeInTheDocument();
    expect(screen.getByText("POST")).toBeInTheDocument();
    expect(screen.getByText("https://example2.com")).toBeInTheDocument();
  });

  it("renders no items when history list is empty", () => {
    render(
      <IntlProviderWrapper>
        <HistoryList historyList={[]} />
      </IntlProviderWrapper>
    );

    expect(screen.queryByText("GET")).not.toBeInTheDocument();
    expect(screen.queryByText("POST")).not.toBeInTheDocument();
  });

  it("should return an empty array when no history items are found", () => {
    vi.spyOn(global.localStorage, "key").mockImplementation(
      (index: number) => `someKey${index}`
    );
    vi.spyOn(global.localStorage, "getItem").mockImplementation(() => null);

    const result = generateHistoryList();

    expect(result).toEqual([]);
  });
});

describe("generateHistoryList", () => {
  it("should return a list of history items", () => {
    const historyItem: HistoryItem = {
      href: "/test-url",
      method: "GET",
      url: "https://example.com",
    };

    const localStorageMock = {
      length: 1,
      key: vi.fn().mockReturnValue("history1"),
      getItem: vi.fn().mockReturnValue(JSON.stringify(historyItem)),
    };

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    const result = generateHistoryList();

    expect(result).toEqual([historyItem]);
    expect(localStorageMock.key).toHaveBeenCalledWith(0);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("history1");
  });
});
