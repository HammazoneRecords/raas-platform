import pathlib
p = pathlib.Path("/home/z/my-project/src/app/artist/settings/page.tsx")
src = p.read_text()

src = src.replace(
    '"use client";\n\nimport Link from "next/link";',
    '"use client";\n\nimport { useState } from "react";\nimport Link from "next/link";',
    1,
)

src = src.replace(
    "  const artist = ARTISTS[0];",
    """  const artist = ARTISTS[0];
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    "New fan subscribes": true,
    "Merch sale": true,
    "Cultural API sale": true,
    "AI Voice generation": false,
    "RASSPay escrow release": true,
    "60-day claim dispute": true,
    "Weekly revenue digest": true,
    "Platform announcements": false,
  });

  const toggle = (label: string) =>
    setNotifications((prev) => ({ ...prev, [label]: !prev[label] }));""",
    1,
)

start = src.index("{[\n              { label:")
end = src.index("))}", start) + 3
old_block = src[start:end]
new_block = """{Object.entries(notifications).map(([label, on]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <span>{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`Toggle ${label}`}
                  onClick={() => toggle(label)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    on ? "bg-[#22C55E]" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      on ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}"""
src = src.replace(old_block, new_block, 1)
p.write_text(src)
print("patched ok")
