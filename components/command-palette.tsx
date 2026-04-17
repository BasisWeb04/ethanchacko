"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type PaletteContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const PaletteCtx = createContext<PaletteContext | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteCtx);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used inside CommandPaletteProvider"
    );
  }
  return ctx;
}

type WorkItem = { label: string; slug: string };

const workItems: WorkItem[] = [
  { label: "Go to ServiceCallTracker case study", slug: "servicecalltracker" },
  { label: "Go to BasisWeb case study", slug: "basisweb" },
  { label: "Go to Hammock case study", slug: "hammock" },
  {
    label: "Go to Operations Command Center case study",
    slug: "operations-command",
  },
  { label: "Go to Warpspeed Bounties case study", slug: "warpspeed" },
  { label: "Go to ACC Scraper case study", slug: "acc-scraper" },
  { label: "Go to Google Maps Scraper case study", slug: "google-maps-scraper" },
];

const pageItems = [
  { label: "Home", href: "/" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Clients", href: "/for-clients" },
];

const EMAIL = "ethan@basisweb.net";
const UPWORK_URL = "https://www.upwork.com/freelancers/ethanchacko";

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const setOpen = useCallback((next: boolean) => {
    setOpenState((prev) => {
      if (next && !prev) {
        previouslyFocused.current =
          document.activeElement as HTMLElement | null;
      }
      return next;
    });
  }, []);

  const toggle = useCallback(() => {
    setOpenState((prev) => {
      if (!prev) {
        previouslyFocused.current =
          document.activeElement as HTMLElement | null;
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    if (!open && previouslyFocused.current) {
      const el = previouslyFocused.current;
      previouslyFocused.current = null;
      el.focus();
    }
  }, [open]);

  return (
    <PaletteCtx.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandPaletteModal />
    </PaletteCtx.Provider>
  );
}

function CommandPaletteModal() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const reducedMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const navigate = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const openExternal = useCallback(
    (url: string) => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
    close();
  }, [close]);

  const emailDirectly = useCallback(() => {
    close();
    window.location.href = `mailto:${EMAIL}`;
  }, [close]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="palette-root"
            data-testid="command-palette"
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-[rgba(5,5,5,0.8)] backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-[560px] max-h-[60vh] flex flex-col bg-bg-elev border border-border-strong rounded-md overflow-hidden"
              initial={reducedMotion ? false : { scale: 0.98 }}
              animate={reducedMotion ? undefined : { scale: 1 }}
              exit={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{
                duration: reducedMotion ? 0 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Command
                label="Command menu"
                loop
                shouldFilter
                className="flex flex-col min-h-0"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                    return;
                  }
                  if (e.key === "Tab") {
                    e.preventDefault();
                  }
                }}
              >
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  data-testid="palette-input"
                  className="w-full bg-transparent border-none outline-none font-mono text-body text-fg placeholder:text-fg-dim p-4"
                />
                <div className="h-px w-full bg-border shrink-0" />
                <Command.List
                  data-testid="palette-list"
                  className="flex-1 overflow-y-auto p-2"
                >
                  <Command.Empty className="py-6 text-center font-mono text-mono text-fg-muted">
                    No matches.
                  </Command.Empty>

                  <Command.Group heading="WORK" className="pb-2">
                    {workItems.map((w) => (
                      <PaletteItem
                        key={w.slug}
                        value={w.label}
                        onSelect={() => navigate(`/work/${w.slug}`)}
                      >
                        {w.label}
                      </PaletteItem>
                    ))}
                  </Command.Group>

                  <Command.Group heading="PAGES" className="pb-2">
                    {pageItems.map((p) => (
                      <PaletteItem
                        key={p.href}
                        value={p.label}
                        onSelect={() => navigate(p.href)}
                      >
                        {p.label}
                      </PaletteItem>
                    ))}
                  </Command.Group>

                  <Command.Group heading="CONTACT" className="pb-2">
                    <PaletteItem value="Copy email address" onSelect={copyEmail}>
                      Copy email address
                    </PaletteItem>
                    <PaletteItem
                      value="Open Upwork profile"
                      onSelect={() => openExternal(UPWORK_URL)}
                    >
                      Open Upwork profile
                    </PaletteItem>
                    <PaletteItem value="Email directly" onSelect={emailDirectly}>
                      Email directly
                    </PaletteItem>
                  </Command.Group>
                </Command.List>

                <div
                  className="border-t border-border px-4 py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-dim flex gap-4"
                  data-testid="palette-footer"
                >
                  <span>{"\u2191\u2193"} navigate</span>
                  <span>{"\u21B5"} select</span>
                  <span>esc close</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            aria-live="polite"
            data-testid="palette-copied-toast"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] bg-bg-elev border border-border-strong px-4 py-2 font-mono text-mono uppercase tracking-widest text-signal"
          >
            COPIED
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PaletteItem({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      data-testid="palette-item"
      className="flex items-center px-3 py-2 rounded text-fg-muted data-[selected=true]:text-fg data-[selected=true]:bg-bg data-[selected=true]:border-l-[3px] data-[selected=true]:border-signal hover:text-fg cursor-pointer text-body transition-colors duration-fast motion-reduce:transition-none"
    >
      {children}
    </Command.Item>
  );
}

export function CommandPaletteTrigger({
  className = "",
}: {
  className?: string;
}) {
  const { toggle } = useCommandPalette();
  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="palette-trigger"
      aria-label="Open command palette"
      className={`inline-flex items-center gap-1 font-mono text-mono uppercase tracking-widest text-fg-muted hover:text-signal transition-colors duration-base focus-visible:text-signal ${className}`}
    >
      <span aria-hidden="true">{"\u2318"}K</span>
    </button>
  );
}
