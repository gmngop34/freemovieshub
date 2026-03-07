import { ExternalLink, Mail, MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Popover */}
      {isOpen && (
        <div
          data-ocid="contact.popover"
          className="mb-1 w-64 rounded-2xl bg-popover border border-border/60 shadow-cinema overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              background: "oklch(0.72 0.22 148 / 0.1)",
              borderBottom: "1px solid oklch(0.72 0.22 148 / 0.2)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "oklch(0.72 0.22 148)",
                  boxShadow: "0 0 6px oklch(0.72 0.22 148)",
                }}
              />
              <span className="text-sm font-bold text-foreground">
                FreeMoviesHUB
              </span>
            </div>
            <button
              type="button"
              data-ocid="contact.close_button"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4 space-y-3">
            <p className="text-sm text-foreground/80 leading-relaxed">
              Questions or suggestions? Reach out to us!
            </p>

            <a
              data-ocid="contact.link"
              href="mailto:contact@freemovieshub.com"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.72 0.22 148 / 0.15)" }}
              >
                <Mail className="w-4 h-4 text-green" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  Email Us
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  contact@freemovieshub.com
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" />
            </a>

            <p className="text-xs text-muted-foreground text-center">
              We usually respond within 24 hours
            </p>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        type="button"
        data-ocid="contact.button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close contact" : "Open contact"}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-cinema transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: isOpen ? "oklch(0.5 0 0)" : "oklch(0.72 0.22 148)",
          boxShadow: isOpen
            ? "0 4px 20px oklch(0 0 0 / 0.4)"
            : "0 4px 20px oklch(0.72 0.22 148 / 0.5), 0 0 0 3px oklch(0.72 0.22 148 / 0.15)",
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5" style={{ color: "oklch(0.97 0 0)" }} />
        ) : (
          <MessageCircle
            className="w-5 h-5"
            style={{ color: "oklch(0.08 0 0)" }}
          />
        )}
      </button>
    </div>
  );
}
