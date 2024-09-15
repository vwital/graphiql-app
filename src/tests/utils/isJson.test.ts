import { describe, it, expect } from "vitest";
import isJson from "@/utils/isJson";

describe("isJson", () => {
  it("should return true for valid JSON", () => {
    const validJson = '{"name": "John", "age": 30}';
    expect(isJson(validJson)).toBe(true);
  });

  it("should return false for invalid JSON", () => {
    const invalidJson = '{"name": "John", "age": 30';
    expect(isJson(invalidJson)).toBe(false);
  });

  it("should return false for non-JSON", () => {
    const notJson = "Hello, World!";
    expect(isJson(notJson)).toBe(false);
  });
});
