"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Maps a scroll progress MotionValue through a range, always on the JS path.
 *
 * Motion 12.30+ can accelerate `useScroll` + `useTransform` via native
 * ViewTimeline/ScrollTimeline. On Safari/iOS that path breaks `opacity`
 * (hero content can render invisible; manifesto words stay dim).
 * A function transformer opts out of acceleration — see motion issue #3559.
 */
export function useScrollMap(
  source: MotionValue<number>,
  inputRange: readonly number[],
  outputRange: readonly number[],
): MotionValue<number> {
  return useTransform(source, (latest) => {
    const last = inputRange.length - 1;
    if (last <= 0) return outputRange[0] ?? 0;
    if (latest <= inputRange[0]!) return outputRange[0]!;
    if (latest >= inputRange[last]!) return outputRange[last]!;

    let i = 0;
    while (i < last - 1 && latest > inputRange[i + 1]!) i++;

    const x0 = inputRange[i]!;
    const x1 = inputRange[i + 1]!;
    const y0 = outputRange[i]!;
    const y1 = outputRange[i + 1]!;
    const t = (latest - x0) / (x1 - x0 || 1);
    return y0 + (y1 - y0) * t;
  });
}
