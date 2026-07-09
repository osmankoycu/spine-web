"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// Physics "tag pile" shell. When it scrolls into view, grey pills fade in around
// the middle and DROP (gravity + collisions), stacking up fast — pıt pıt pıt.
// The user can grab + fling them; a grabbed tag turns black, then reverts to
// grey on release. Everything is bounded inside the section and sits BEHIND the
// centered `children` (the copy / CTA), which are pointer-events-none so drags
// pass through to the physics layer.
//
// Extracted from the original TagDrop so the closing CTA (homepage) and the
// merged interior-page closer can share the exact same physics + tag styling.

const TAGS = [
  "Hired someone",
  "Changed work locations",
  "Requested time off",
  "Got a raise",
  "Lost their computer",
  "Approved PTO",
  "Got promoted",
  "New hire onboarding",
  "Needs a new app",
  "Had a baby",
  "Changed phone numbers",
  "Fixed a paycheck error",
  "Added a dependent",
  "Updated withholding",
];

export function TagField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    Promise.all([import("matter-js"), document.fonts?.ready ?? Promise.resolve()]).then(
      ([{ default: Matter }]) => {
        if (cancelled || !boxRef.current) return;
        const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } =
          Matter;

        const engine = Engine.create();
        engine.gravity.y = 1;

        let W = box.clientWidth;
        let H = box.clientHeight;

        const wall = { isStatic: true, render: { visible: false } };
        const T = 240;
        const floor = Bodies.rectangle(W / 2, H + T / 2, W * 3, T, wall);
        const left = Bodies.rectangle(-T / 2, H / 2, T, H * 4, wall);
        const right = Bodies.rectangle(W + T / 2, H / 2, T, H * 4, wall);
        const ceil = Bodies.rectangle(W / 2, -T / 2 - 120, W * 3, T, wall);
        Composite.add(engine.world, [floor, left, right, ceil]);

        const els = tagRefs.current.filter((el): el is HTMLDivElement => el != null);
        const items = els.map((el) => {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const body = Bodies.rectangle(W / 2, H * 0.42, w, h, {
            chamfer: { radius: h / 2 },
            restitution: 0.28,
            friction: 0.55,
            frictionStatic: 0.9,
            density: 0.0014,
            render: { visible: false },
          });
          (body as unknown as { __el: HTMLElement }).__el = el;
          return { body, el };
        });

        const mouse = Mouse.create(box);
        const mc = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.16, damping: 0.12, render: { visible: false } },
        });
        Composite.add(engine.world, mc);
        const mw = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
        box.removeEventListener("wheel", mw);
        box.removeEventListener("mousewheel", mw);

        const draggedEl = (e: unknown) =>
          (e as { body?: { __el?: HTMLElement } }).body?.__el ?? null;
        Events.on(mc, "startdrag", (e) => {
          const el = draggedEl(e);
          if (el) el.dataset.active = "true";
        });
        Events.on(mc, "enddrag", (e) => {
          const el = draggedEl(e);
          if (el) delete el.dataset.active;
        });

        const runner = Runner.create();
        Runner.run(runner, engine);

        let raf = 0;
        const sync = () => {
          for (const { body, el } of items) {
            el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${
              body.position.y - el.offsetHeight / 2
            }px) rotate(${body.angle}rad)`;
          }
          raf = requestAnimationFrame(sync);
        };
        raf = requestAnimationFrame(sync);

        let spawned = false;
        const spawn = () => {
          if (spawned) return;
          spawned = true;
          items.forEach((it, i) => {
            window.setTimeout(() => {
              if (cancelled) return;
              Body.setPosition(it.body, {
                x: W / 2 + (Math.random() * 2 - 1) * W * 0.16,
                y: H * 0.4,
              });
              Body.setAngle(it.body, (Math.random() * 2 - 1) * 0.5);
              Body.setVelocity(it.body, { x: (Math.random() * 2 - 1) * 2, y: 1 });
              Body.setAngularVelocity(it.body, (Math.random() * 2 - 1) * 0.12);
              Composite.add(engine.world, it.body);
              it.el.style.opacity = "1";
            }, i * 95);
          });
        };
        const io = new IntersectionObserver(
          (entries) => entries[0]?.isIntersecting && spawn(),
          { threshold: 0.3 },
        );
        io.observe(box);

        const onResize = () => {
          W = box.clientWidth;
          H = box.clientHeight;
          Body.setPosition(floor, { x: W / 2, y: H + T / 2 });
          Body.setPosition(left, { x: -T / 2, y: H / 2 });
          Body.setPosition(right, { x: W + T / 2, y: H / 2 });
          Body.setPosition(ceil, { x: W / 2, y: -T / 2 - 120 });
        };
        window.addEventListener("resize", onResize);

        teardown = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          window.removeEventListener("resize", onResize);
          Runner.stop(runner);
          Composite.clear(engine.world, false, true);
          Engine.clear(engine);
        };
      },
    );

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return (
    <section className={cn("relative overflow-hidden bg-white", className)}>
      <div ref={boxRef} className="absolute inset-0 z-0 select-none">
        {TAGS.map((label, i) => (
          <div
            key={label}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            data-tag
            style={{ top: 0, left: 0 }}
            className="pointer-events-none absolute whitespace-nowrap rounded-pill bg-[#e7eaef] px-[22px] py-[16px] text-[16px] font-medium leading-none tracking-[-0.02em] text-white opacity-0 transition-opacity duration-300 will-change-transform data-[active=true]:bg-black sm:px-[30px] sm:py-[21px] sm:text-[20px] lg:px-[36px] lg:py-[25px] lg:text-[22px]"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Copy — in front, but pointer-events-none so drags pass through to the
          physics layer; interactive elements inside must set pointer-events-auto.
          Not h-full, so a caller can let content define the section height (pass a
          min-h instead of a fixed h) — see the merged audience closer. */}
      <div className="pointer-events-none relative z-10">{children}</div>
    </section>
  );
}
