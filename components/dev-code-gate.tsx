import { isPreviewUnlocked } from "@/lib/preview-gate";
import { lockPreviewAction, unlockPreviewAction } from "@/app/preview-actions";

export function DevCodeGate({ denied }: { denied?: boolean }) {
  const unlocked = isPreviewUnlocked();

  if (unlocked) {
    return (
      <form
        action={lockPreviewAction}
        className="flex items-center gap-2 text-bone/40"
      >
        <span>preview unlocked</span>
        <span className="text-bone/20">·</span>
        <button
          type="submit"
          className="hover:text-bone/80 transition"
        >
          exit
        </button>
      </form>
    );
  }

  return (
    <form
      action={unlockPreviewAction}
      className="flex items-center gap-2"
    >
      <label htmlFor="dev-code" className="text-bone/30">
        dev code:
      </label>
      <input
        id="dev-code"
        name="code"
        type="password"
        autoComplete="off"
        spellCheck={false}
        className="w-28 bg-transparent border-b border-bone/15 px-1 py-0.5 text-bone/60 placeholder:text-bone/20 focus:border-bone/40 focus:outline-none transition"
      />
      {denied && <span className="text-bone/40">denied</span>}
    </form>
  );
}
