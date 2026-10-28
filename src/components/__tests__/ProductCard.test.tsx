import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { mockProduct, mockPremiumProduct } from "../../test/fixtures";

const noop = () => {};

describe("ProductCard", () => {
  it("renders product name, origin, weight and price", () => {
    render(<ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.origin} · ${mockProduct.weight}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it("renders the roast level badge", () => {
    render(<ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />);
    expect(screen.getByText("Светлая")).toBeInTheDocument();
  });

  it("shows the Премиум badge only for premium products", () => {
    const { unmount } = render(
      <ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />
    );
    expect(screen.queryByText("Премиум")).not.toBeInTheDocument();
    unmount();

    render(<ProductCard product={mockPremiumProduct} onAddToCart={noop} onViewDetails={noop} />);
    expect(screen.getByText("Премиум")).toBeInTheDocument();
  });

  it("renders the rating", () => {
    render(<ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />);
    expect(screen.getByText(String(mockProduct.rating))).toBeInTheDocument();
  });

  it("displays at most 3 tasting notes", () => {
    render(<ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />);
    // У mockProduct 4 ноты, показываемся только первые 3
    expect(screen.getByText("Черника")).toBeInTheDocument();
    expect(screen.getByText("Жасмин")).toBeInTheDocument();
    expect(screen.getByText("Лимонная цедра")).toBeInTheDocument();
    expect(screen.queryByText("Мёд")).not.toBeInTheDocument();
  });

  it("calls onAddToCart with the product when 'В корзину' is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    render(
      <ProductCard product={mockProduct} onAddToCart={onAddToCart} onViewDetails={noop} />
    );
    const buttons = screen.getAllByRole("button", { name: /В корзину/ });
    await user.click(buttons[0]);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it("calls onViewDetails with the product when 'Подробнее' is clicked", async () => {
    const user = userEvent.setup();
    const onViewDetails = vi.fn();
    render(
      <ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={onViewDetails} />
    );
    await user.click(screen.getByRole("button", { name: /Подробнее/ }));
    expect(onViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it("applies hover scale to the image on mouse enter", async () => {
    const { container, rerender } = render(
      <ProductCard product={mockProduct} onAddToCart={noop} onViewDetails={noop} />
    );
    const img = container.querySelector("img")!;
    expect(img.className).toContain("scale-100");

    // Наводим курсор через fireEvent внутри act(), чтобы избежать
    // предупреждения React "not wrapped in act(...)"
    const card = screen.getByText(mockProduct.name).closest(".group")!;
    await act(async () => {
      fireEvent.mouseEnter(card);
    });
    expect(img.className).toContain("scale-110");
    await act(async () => {
      fireEvent.mouseLeave(card);
    });
    expect(img.className).toContain("scale-100");
    void rerender;
  });
});
