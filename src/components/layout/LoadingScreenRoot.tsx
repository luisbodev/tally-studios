import Script from "next/script";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

/**
 * Skip flash on return visits + hard failsafe on <html>.
 * Class on documentElement survives React hydration (unlike mutating the loader node).
 */
const SKIP_SCRIPT = `
(function () {
  try {
    if (sessionStorage.getItem("tally-intro") === "1") {
      document.documentElement.classList.add("loader-skip");
      return;
    }
  } catch (e) {}
  // If React never hydrates, still clear the overlay.
  window.setTimeout(function () {
    document.documentElement.classList.add("loader-done");
    document.documentElement.classList.remove("loader-active");
    try { sessionStorage.setItem("tally-intro", "1"); } catch (e) {}
  }, 2500);
})();
`;

export function LoadingScreenRoot() {
  return (
    <>
      <Script id="tally-loader-skip" strategy="beforeInteractive">
        {SKIP_SCRIPT}
      </Script>
      <noscript>
        <style>{`#tally-loader{display:none!important}`}</style>
      </noscript>
      <LoadingScreen />
    </>
  );
}
