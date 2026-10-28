import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart, { CartItem } from "../Cart";
import { mockProduct, mockPremiumProduct, makeCartItem } from "../../test/fixtures";

const noop = () => {};

const renderCart = (items: CartItem[], overrides = {}) =>
  render(
    <Cart
      items={items}
      isOpen={true}
      onClose={noop}
      onUpdateQuantity={noop}
      onRemoveItem={noop}
      onCheckout={noop}
      {...overrides}
    />
  );

describe("Cart", () => {
  it("renders the header title", () => {
    renderCart([]);
    expect(screen.getByText("Ваша корзина")).toBeInTheDocument();
  });

  it("shows the empty state when there are no items", () => {
    renderCart([]);
    expect(screen.getByText("Ваша корзина пуста")).toBeInTheDocument();
    expect(screen.queryByText("Оформить заказ")).not.toBeInTheDocument();
  });

  it("renders each cart item with name, weight and quantity", () => {
    renderCart([makeCartItem(mockProduct, 2), makeCartItem(mockPremiumProduct, 1)]);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockPremiumProduct.name)).toBeInTheDocument();
    expect(screen.getAllByText("250г")).toHaveLength(2);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("displays the total item count badge", () => {
    renderCart([makeCartItem(mockProduct, 2), makeCartItem(mockPremiumProduct, 3)]);
    // 2 + 3 = 5 единиц товара
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calculates line totals and grand total correctly", () => {
    renderCart([makeCartItem(mockProduct, 2), makeCartItem(mockPremiumProduct, 1)]);
    // 24.99 * 2 = 49.98, 28.99 * 1 = 28.99, итого 78.97
    expect(screen.getByText("$49.98")).toBeInTheDocument();
    expect(screen.getByText("$28.99")).toBeInTheDocument();
    expect(screen.getAllByText("$78.97").length).toBeGreaterThan(0);
  });

  it("shows free delivery and checkout button when cart is not empty", () => {
    renderCart([makeCartItem(mockProduct)]);
    expect(screen.getByText("Бесплатно")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Оформить заказ" })).toBeInTheDocument();
  });

  it("calls onUpdateQuantity with decremented quantity on minus click", () => {
    const onUpdateQuantity = vi.fn();
    renderCart([makeCartItem(mockProduct, 3)], { onUpdateQuantity });
    // Кнопки в строке товара: [минус] [плюс] [удалить]
    const row = screen.getByText(mockProduct.name).closest("div.flex.gap-3")!;
    const minusBtn = row.querySelectorAll("button")[0];
    minusBtn.click();
    expect(onUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 2);
  });

  it("calls onUpdateQuantity with incremented quantity on plus click", () => {
    const onUpdateQuantity = vi.fn();
    renderCart([makeCartItem(mockProduct, 3)], { onUpdateQuantity });
    const row = screen.getByText(mockProduct.name).closest("div.flex.gap-3")!;
    const plusBtn = row.querySelectorAll("button")[1];
    plusBtn.click();
    expect(onUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 4);
  });

  it("calls onRemoveItem with product id on trash click", () => {
    const onRemoveItem = vi.fn();
    renderCart([makeCartItem(mockProduct)], { onRemoveItem });
    const row = screen.getByText(mockProduct.name).closest("div.flex.gap-3")!;
    const removeBtn = row.querySelectorAll("button")[2];
    removeBtn.click();
    expect(onRemoveItem).toHaveBeenCalledWith(mockProduct.id);
  });

  it("calls onCheckout when the checkout button is clicked", () => {
    const onCheckout = vi.fn();
    renderCart([makeCartItem(mockProduct)], { onCheckout });
    screen.getByRole("button", { name: "Оформить заказ" }).click();
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    renderCart([makeCartItem(mockProduct)], { onClose });
    // Кнопка закрытия — единственная с классом rounded-full w-9 в шапке
    const closeBtn = screen.getByText("Ваша корзина")
      .closest("div")!.parentElement!.querySelector("button")!;
    closeBtn.click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
