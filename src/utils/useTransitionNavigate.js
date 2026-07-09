// Navigation wrapped in the browser View Transitions API, so route changes
// can animate (the event list card morphs into its details card via matching
// view-transition-name styles). This manual wrapper exists because React
// Router's own `viewTransition` option only works with a data router
// (createBrowserRouter) and this app mounts a plain <BrowserRouter> — the
// option is silently ignored there.
//
// flushSync is required: startViewTransition snapshots the old DOM, runs the
// callback, and snapshots the new DOM — React's async rendering would leave
// the DOM unchanged inside the callback without it. Browsers without the API
// (Firefox) just navigate with no animation, and index.css disables the
// animation under prefers-reduced-motion.

import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

function useTransitionNavigate() {
  const navigate = useNavigate();

  return (to) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };
}

export default useTransitionNavigate;
