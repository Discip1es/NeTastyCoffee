import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkout from "../Checkout";
import { makeCartItem, mockProduct, mockPremiumProduct } from "../../test/fixtures";

const noop = () => {};

const renderCheckout = (overrides = {}) =>
  render(
    <Checkout
      items={[makeCartItem(mockProduct, 2), makeCartItem(mockPremiumProduct, 1)]}
      onClose={noop}
      onComplete={noop}
      {...overrides}
    />
  );

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText("Полное имя"), "Иван Петров");
  await user.type(screen.getByPlaceholderText("Email адрес"), "ivan@example.com");
  await user.type(screen.getByPlaceholderText("Адрес"), "ул. Ленина, 1");
  await user.type(screen.getByPlaceholderText("Город"), "Москва");
  await user.type(screen.getByPlaceholderText("Почтовый индекс"), "101000");
  await user.type(screen.getByPlaceholderText("Номер карты"), "4111111111111111");
  await user.type(screen.getByPlaceholderText("ММ/ГГ"), "12/28");
  await user.type(screen.getByPlaceholderText("CVV"), "123");
};

// Продвигаем таймеры на 2.1с внутри act(), чтобы setTimeout в Checkout
// (переход из 'processing' в 'success') отработал и React перерендерился.
const advancePastProcessing = async () => {
  await act(async () => {
    vi.advanceTimersByTime(2100);
  });
};

describe("Checkout", () => {
  it("renders the order summary with line items and total", () => {
    renderCheckout();
    expect(screen.getByText("Оформление заказа")).toBeInTheDocument();
    // 24.99*2 + 28.99*1 = 78.97
    expect(screen.getByText(`${mockProduct.name} × 2`)).toBeInTheDocument();
    expect(screen.getByText("$49.98")).toBeInTheDocument();
    expect(screen.getByText("$78.97")).toBeInTheDocument();
  });

  it("shows all required shipping and payment inputs", () => {
    renderCheckout();
    for (const placeholder of [
      "Полное имя",
      "Email адрес",
      "Адрес",
      "Город",
      "Почтовый индекс",
      "Номер карты",
      "ММ/ГГ",
      "CVV",
    ]) {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    }
  });

  it("does not proceed to processing when required fields are empty", async () => {
    const user = userEvent.setup();
    renderCheckout();
    await user.click(screen.getByRole("button", { name: /Подтвердить заказ/ }));
    expect(screen.queryByText("Обработка заказа")).not.toBeInTheDocument();
  });

  it("submits the form, shows processing state and then success after 2s", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCheckout();
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Подтвердить заказ/ }));

    expect(screen.getByText("Обработка заказа")).toBeInTheDocument();

    await advancePastProcessing();
    expect(screen.getByText("Заказ подтверждён!")).toBeInTheDocument();
    expect(screen.getByText(/Заказ №AC-/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("calls onComplete when 'Продолжить покупки' is clicked on success screen", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onComplete = vi.fn();
    renderCheckout({ onComplete });
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Подтвердить заказ/ }));

    await advancePastProcessing();
    await user.click(screen.getByRole("button", { name: "Продолжить покупки" }));
    expect(onComplete).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderCheckout({ onClose });
    const closeBtn = screen
      .getByText("Оформление заказа")
      .parentElement!.querySelector("button")!;
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
