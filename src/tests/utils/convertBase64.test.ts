import { convertToBase64, convertFromBase64 } from "@/utils/convertBase64";

describe("convertToBase64", () => {
  it("should convert a URL string to base64", () => {
    const url = "https://example.com";
    const result = convertToBase64(url);

    expect(result).toBe(btoa(url));
  });
});

describe("convertFromBase64", () => {
  it("should convert a base64 string back to the original URL", () => {
    const base64 = btoa("https://example.com");
    const result = convertFromBase64(base64);

    expect(result).toBe("https://example.com");
  });
});
