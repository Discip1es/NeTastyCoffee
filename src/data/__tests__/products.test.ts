import { describe, it, expect } from "vitest";
import { products, categories, roastLevels, Product } from "../products";

describe("products data", () => {
  it("exports a non-empty list of products", () => {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("has unique product ids", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every product has valid required fields", () => {
    for (const p of products as Product[]) {
      expect(p.name).toBeTruthy();
      expect(p.origin).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.weight).toMatch(/г$/);
      expect(p.notes.length).toBeGreaterThan(0);
      expect(p.rating).toBeGreaterThanOrEqual(0);
      expect(p.rating).toBeLessThanOrEqual(5);
      expect(p.image).toMatch(/^https?:\/\//);
    }
  });

  it("product categories are contained in the exported categories list", () => {
    for (const p of products) {
      expect(categories).toContain(p.category);
    }
  });

  it("product roast levels are contained in the exported roast levels list", () => {
    for (const p of products) {
      expect(roastLevels).toContain(p.roast);
    }
  });

  it("filter lists start with the 'Все' option", () => {
    expect(categories[0]).toBe("Все");
    expect(roastLevels[0]).toBe("Все");
  });
});
