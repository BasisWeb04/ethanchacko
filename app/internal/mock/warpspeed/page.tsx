export const metadata = { robots: "noindex, nofollow" };

const fileTree = [
  { name: "BOUNTY_SPEC.md", active: true },
  { name: "QA_CHECKLIST.md", active: false },
  { name: "App.tsx", active: false },
  { name: "src/", active: false, children: ["BiometricLock.tsx", "NoteVault.tsx", "KeychainBridge.ts"] },
  { name: "ios/", active: false },
  { name: "android/", active: false },
  { name: "package.json", active: false },
];

export default function WarpspeedMock() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0b0d] text-[#e4e4e4] font-mono text-[13px] leading-relaxed flex">
      {/* Sidebar */}
      <aside className="w-[260px] shrink-0 border-r border-[#1c1c20] bg-[#0a0a0c] flex flex-col">
        <div className="h-[38px] flex items-center px-4 border-b border-[#1c1c20] text-[11px] uppercase tracking-[0.12em] text-[#5a5a60]">
          bounty-016-biometric
        </div>
        <ul className="py-3 px-2 space-y-[2px]">
          {fileTree.map((f) => (
            <li key={f.name}>
              <div
                className={`px-3 py-[6px] rounded text-[12px] ${
                  f.active
                    ? "bg-[#17171c] text-[#ffb000]"
                    : "text-[#9a9aa0] hover:bg-[#14141a]"
                }`}
              >
                {f.name}
              </div>
              {f.children && (
                <ul className="ml-4 mt-[2px] space-y-[2px]">
                  {f.children.map((c) => (
                    <li
                      key={c}
                      className="px-3 py-[5px] text-[12px] text-[#7a7a80] rounded"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto px-4 py-3 border-t border-[#1c1c20] text-[11px] text-[#5a5a60]">
          main &bull; clean
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tab bar */}
        <div className="h-[38px] flex items-stretch border-b border-[#1c1c20] bg-[#0a0a0c] text-[12px]">
          <div className="flex items-center px-4 border-r border-[#1c1c20] bg-[#0b0b0d] text-[#e4e4e4]">
            BOUNTY_SPEC.md
          </div>
          <div className="flex items-center px-4 border-r border-[#1c1c20] text-[#6a6a70]">
            QA_CHECKLIST.md
          </div>
          <div className="flex items-center px-4 border-r border-[#1c1c20] text-[#6a6a70]">
            NoteVault.tsx
          </div>
          <div className="ml-auto flex items-center px-4 text-[11px] text-[#5a5a60]">
            WARPSPEED / BOUNTY-016
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden flex">
          {/* Gutter */}
          <div className="w-[52px] shrink-0 text-right pr-3 py-5 text-[11px] text-[#3a3a40] select-none">
            {Array.from({ length: 34 }, (_, i) => (
              <div key={i} className="leading-[22px]">{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <pre className="flex-1 py-5 pr-8 leading-[22px] whitespace-pre overflow-hidden">
{`# BOUNTY-016: Note-level Biometric Security

`}<span className="text-[#6a6a70]">## Payout</span>{`
$660 USD, first QA-passing PR wins.

`}<span className="text-[#6a6a70]">## Spec</span>{`
- Each note stores an `}<span className="text-[#ffb000]">isLocked</span>{` boolean.
- Locked notes render a blur overlay + lock icon in the list.
- Opening a locked note triggers `}<span className="text-[#8ec07c]">Face ID</span>{` / `}<span className="text-[#8ec07c]">Touch ID</span>{` / passcode fallback.
- Unlock is remembered for 5 minutes, then re-challenges.
- Bio data never leaves the device. Keychain only.

`}<span className="text-[#6a6a70]">## Platform requirements</span>{`
- iOS 15+, Android 11+
- `}<span className="text-[#7fa9e5]">expo-local-authentication</span>{` for prompts
- `}<span className="text-[#7fa9e5]">react-native-keychain</span>{` for encrypted persistence
- No backend writes. All state local.

`}<span className="text-[#6a6a70]">## Deliverables</span>{`
1. PR against `}<span className="text-[#ffb000]">main</span>{`, squashable.
2. Runs on iOS simulator + Android emulator with one command.
3. Passes the 14-item checklist in `}<span className="text-[#ffb000]">QA_CHECKLIST.md</span>{`.
4. No new third-party deps beyond the two listed above.

`}<span className="text-[#6a6a70]">## Submission window</span>{`
Opens: 2026-02-11 14:00 UTC
Closes on first passing PR.`}
          </pre>
        </div>

        {/* Status bar */}
        <div className="h-[26px] flex items-center justify-between px-4 border-t border-[#1c1c20] bg-[#0a0a0c] text-[11px] text-[#6a6a70]">
          <div className="flex items-center gap-4">
            <span className="text-[#22C55E]">&bull; PR #412 passing</span>
            <span>Claude Code: 4 edits, 0 rejects</span>
            <span>elapsed: 3h 14m</span>
          </div>
          <div className="flex items-center gap-4">
            <span>markdown</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
