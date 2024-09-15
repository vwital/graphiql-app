import { vi, describe, expect, it, Mock } from "vitest";
import restClientFormAction from "@/app/actions/restClientFormAction";

global.fetch = vi.fn();

describe("restClientFormAction", () => {
  it("should make a request and return the response", async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ message: "Success" }),
      status: 200,
      statusText: "OK",
      headers: {
        get: vi.fn().mockReturnValue("application/json; charset=utf-8"),
      },
    };

    (global.fetch as Mock).mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append("url", "https://example.com");
    formData.append("method", "POST");
    formData.append("body.0.value", JSON.stringify({ name: "Test" }));

    const result = await restClientFormAction({}, formData);

    expect(result).toEqual({
      dataFromResponse: { message: "Success" },
      statusCode: 200,
      statusText: "OK",
    });
    expect(fetch).toHaveBeenCalledWith("https://example.com", {
      method: "POST",
      body: JSON.stringify({ name: "Test" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
