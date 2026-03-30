'use client';

import { useEffect, useRef, useState } from "react";
import type { VisitorBehavior } from "@/types/visitor-behavior";

function useVisitorBehavior() {
    const [behavior, setBehavior] = useState<VisitorBehavior>({
        scrollDepth: 0,
        isFastScrolling: false,
        pageVisible: true,
        currentSection: null,
        viewedSections: [],
        dwellTimeMsBySection: {},
        focusedProjectId: null,
        clickedProjectIds: [],
    });

    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(0);
    const visibleSectionsRef = useRef(new Set<string>());
    // Track when each section became visible so dwell time can accumulate incrementally.
    const sectionEntryTime = useRef<Record<string, number>>({});

    useEffect(() => {
        // Compute max scroll depth and an approximate current scroll speed.
        lastScrollTime.current = Date.now();

        const onScroll = () => {
            const now = Date.now();
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const depth = docHeight > 0 ? Math.min(1, (scrollY + winHeight) / docHeight) : 0;
            const dt = (now - lastScrollTime.current) / 1000 || 0.016;
            const velocity = Math.abs(scrollY - lastScrollY.current) / dt;

            lastScrollY.current = scrollY;
            lastScrollTime.current = now;

            setBehavior(prev => ({
                ...prev,
                scrollDepth: Math.max(prev.scrollDepth, Math.round(depth * 100) / 100),
                isFastScrolling: velocity > 3000,
            }));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        // Keep visibility state in sync so background tabs do not count as active engagement.
        const onChange = () => {
            setBehavior(prev => ({
                ...prev,
                pageVisible: document.visibilityState === "visible",
            }));
        };

        onChange();
        document.addEventListener("visibilitychange", onChange);
        return () => document.removeEventListener("visibilitychange", onChange);
    }, []);

    useEffect(() => {
        // Observe semantic page sections marked with data-section.
        const sections = document.querySelectorAll("[data-section]");
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const id = (entry.target as HTMLElement).dataset.section || "unknown";

                    if (entry.isIntersecting) {
                        visibleSectionsRef.current.add(id);
                        if (!sectionEntryTime.current[id]) {
                            sectionEntryTime.current[id] = Date.now();
                        }
                    } else {
                        visibleSectionsRef.current.delete(id);
                        delete sectionEntryTime.current[id];
                    }
                });

                const visibleSections = [...visibleSectionsRef.current];
                const currentSection = visibleSections.length > 0 ? visibleSections[0] : null;

                setBehavior(prev => ({
                    ...prev,
                    currentSection,
                    viewedSections: [...new Set([...prev.viewedSections, ...visibleSections])],
                }));
            },
            { threshold: 0.5 }
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Periodically roll up visible-section time into the aggregated dwell map.
        const timer = setInterval(() => {
            if (document.visibilityState !== "visible") return;

            const now = Date.now();
            const updates: Record<string, number> = {};

            for (const id of visibleSectionsRef.current) {
                if (sectionEntryTime.current[id]) {
                    updates[id] = now - sectionEntryTime.current[id];
                    sectionEntryTime.current[id] = now;
                }
            }

            if (Object.keys(updates).length === 0) return;

            setBehavior(prev => {
                const merged = { ...prev.dwellTimeMsBySection };
                for (const [id, ms] of Object.entries(updates)) {
                    merged[id] = (merged[id] || 0) + ms;
                }
                return { ...prev, dwellTimeMsBySection: merged };
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Capture project card clicks from any descendant marked with data-project-id.
        const onClick = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest("[data-project-id]");
            if (!el) return;

            const pid = (el as HTMLElement).dataset.projectId;
            if (!pid) return;

            setBehavior(prev => ({
                ...prev,
                focusedProjectId: pid,
                clickedProjectIds: prev.clickedProjectIds.includes(pid)
                    ? prev.clickedProjectIds
                    : [...prev.clickedProjectIds, pid],
            }));
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return behavior;
}

export default useVisitorBehavior;
