"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { CloseIcon } from "@/components/icons";
import { useToast } from "@/components/feedback";
import { courses } from "@/data/site";

export type CartItem = {
  id: string;
  title: string;
  author: string;
  price: string;
  thumbnail: string;
};

type CartValue = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const STORAGE_KEY = "bytespace-cart";
const CartContext = createContext<CartValue>({
  items: [],
  isOpen: false,
  add: () => {},
  remove: () => {},
  clear: () => {},
  open: () => {},
  close: () => {},
});

export function courseToCartItem(course: (typeof courses)[number]): CartItem {
  return {
    id: course.title.toLowerCase().replace(/\s+/g, "-"),
    title: course.title,
    author: course.author,
    price: course.price,
    thumbnail: course.thumbnail,
  };
}

const money = (value: string) => Number(value.replace(/[^0-9.]/g, "")) || 0;

const EMPTY_ITEMS: CartItem[] = [];
const cartListeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedItems: CartItem[] = EMPTY_ITEMS;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): CartItem[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    let parsed: unknown = EMPTY_ITEMS;
    try {
      parsed = raw ? JSON.parse(raw) : EMPTY_ITEMS;
    } catch {
      parsed = EMPTY_ITEMS;
    }
    cachedItems = Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY_ITEMS;
  }
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function subscribeCart(onStoreChange: () => void) {
  cartListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cachedRaw = undefined;
    onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    cartListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore unavailable storage */
  }
  cachedRaw = undefined;
  cartListeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getSnapshot, getServerSnapshot);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((item: CartItem) => {
    const list = getSnapshot();
    if (list.some((i) => i.id === item.id)) return;
    writeCart([...list, item]);
  }, []);
  const remove = useCallback((id: string) => {
    const list = getSnapshot();
    const next = list.filter((i) => i.id !== id);
    if (next.length === list.length) return;
    writeCart(next);
  }, []);
  const clear = useCallback(() => {
    if (getSnapshot().length === 0) return;
    writeCart(EMPTY_ITEMS);
  }, []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value: CartValue = { items, isOpen, add, remove, clear, open, close };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart(): CartValue {
  return useContext(CartContext);
}

function CartDrawer() {
  const { items, isOpen, close, remove, clear } = useCart();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + money(item.price), 0);

  const checkout = () => {
    close();
    toast("Almost there — create an account to finish enrolling.", "success");
    router.push("/register");
  };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping cart" data-testid="cart-drawer">
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-neutral-950/50"
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-[0_0_60px_-10px_rgba(16,24,40,0.4)]">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-5">
          <div className="flex flex-col">
            <h2 className="font-heading text-[20px] leading-[26px] font-semibold tracking-[-0.01em] text-neutral-950">
              Your Cart
            </h2>
            <span className="text-[14px] leading-[22px] text-neutral-700">
              {items.length} {items.length === 1 ? "course" : "courses"}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            data-testid="cart-close"
            onClick={close}
            className="grid size-9 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-[16px] leading-[26px] text-neutral-700">
                Your cart is empty. Find a course you love and hit Enroll Now.
              </p>
              <button
                type="button"
                data-testid="cart-browse"
                onClick={() => {
                  close();
                  router.push("/search");
                }}
                className="inline-flex h-[46px] items-center justify-center rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
              >
                Browse courses
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-[16px] border border-hairline p-3"
                  data-testid="cart-item"
                >
                  <Image
                    src={item.thumbnail}
                    alt=""
                    width={72}
                    height={44}
                    className="h-[44px] w-[72px] shrink-0 rounded-[8px] object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Link
                      href="/course"
                      onClick={close}
                      className="truncate text-[16px] leading-[22px] font-medium text-neutral-950 hover:text-primary-600"
                    >
                      {item.title}
                    </Link>
                    <span className="text-[14px] leading-[20px] text-neutral-700">{item.author}</span>
                    <span className="text-[16px] leading-[22px] font-medium text-primary-800">
                      {item.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title} from cart`}
                    data-testid="cart-remove"
                    onClick={() => remove(item.id)}
                    className="grid size-8 shrink-0 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                  >
                    <CloseIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-4 border-t border-hairline px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[16px] leading-[26px] text-neutral-700">Subtotal</span>
              <span className="font-heading text-[24px] leading-[30px] font-semibold text-primary-800">
                ${subtotal}
              </span>
            </div>
            <button
              type="button"
              data-testid="cart-checkout"
              onClick={checkout}
              className="h-[46px] w-full rounded-[24px] bg-secondary-400 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
            >
              Check out
            </button>
            <button
              type="button"
              data-testid="cart-clear"
              onClick={() => {
                clear();
                toast("Cart cleared.");
              }}
              className="h-[42px] w-full rounded-[24px] border border-hairline text-[16px] leading-[26px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950"
            >
              Clear cart
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
