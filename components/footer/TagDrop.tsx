"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Closing CTA over a physics "tag pile". When the section scrolls into view, the
// tags fade in around the middle and DROP (gravity + collisions), stacking up
// fast — pıt pıt pıt. The user can grab + fling them with the mouse; a grabbed
// tag turns black (active), then reverts to grey when released. Everything is
// bounded inside this white section and sits BEHIND the heading / CTA.
//
// Real rigid-body dynamics (rotation, throwing, resting stacks) are done with
// matter-js, loaded lazily inside the effect (client-only). DOM pills are synced
// to body position/angle every frame — no canvas, so they keep our exact styling.

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

const CONTACT_EMAIL = "hello@spine.com"; // TODO: confirm the real contact address

export function TagDrop() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    // Lazy-load matter-js and build the world only after fonts are ready, so the
    // measured pill widths (which size the bodies) are correct.
    Promise.all([import("matter-js"), document.fonts?.ready ?? Promise.resolve()]).then(
      ([{ default: Matter }]) => {
        if (cancelled || !boxRef.current) return;
        const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } =
          Matter;

        const engine = Engine.create();
        engine.gravity.y = 1;

        let W = box.clientWidth;
        let H = box.clientHeight;

        // Static walls (left / right / floor / high ceiling) keep the pile inside.
        const wall = { isStatic: true, render: { visible: false } };
        const T = 240;
        const floor = Bodies.rectangle(W / 2, H + T / 2, W * 3, T, wall);
        const left = Bodies.rectangle(-T / 2, H / 2, T, H * 4, wall);
        const right = Bodies.rectangle(W + T / 2, H / 2, T, H * 4, wall);
        const ceil = Bodies.rectangle(W / 2, -T / 2 - 120, W * 3, T, wall);
        Composite.add(engine.world, [floor, left, right, ceil]);

        // One pill body per measured DOM tag (stadium shape via chamfer = h/2).
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
        // NOTE: bodies are NOT added here — each is added to the world at its
        // staggered spawn (below). Adding them static-then-unstatic instead would
        // leave inverseMass = 0 (a matter-js quirk) and they'd never fall.

        // Mouse drag + throw.
        const mouse = Mouse.create(box);
        const mc = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.16, damping: 0.12, render: { visible: false } },
        });
        Composite.add(engine.world, mc);
        // Don't hijack page scroll with the wheel.
        const mw = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
        box.removeEventListener("wheel", mw);
        box.removeEventListener("mousewheel", mw);

        // Grabbed → black; released → back to grey.
        Events.on(mc, "startdrag", (e: { body?: { __el?: HTMLElement } }) => {
          if (e.body?.__el) e.body.__el.dataset.active = "true";
        });
        Events.on(mc, "enddrag", (e: { body?: { __el?: HTMLElement } }) => {
          if (e.body?.__el) delete e.body.__el.dataset.active;
        });

        const runner = Runner.create();
        Runner.run(runner, engine);

        // Sync DOM transforms to body position/angle each frame.
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

        // Drop the tags one by one once the section is on screen.
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
              Composite.add(engine.world, it.body); // enters the sim now → falls
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
    <section className="relative h-[900px] overflow-hidden bg-white">
      {/* Physics layer — receives the drag; pills are pointer-events-none so the
          drag hit-tests against matter bodies, not the DOM, and text can't be
          selected. Sits BEHIND the copy. */}
      <div ref={boxRef} className="absolute inset-0 z-0 select-none">
        {TAGS.map((label, i) => (
          <div
            key={label}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            data-tag
            style={{ top: 0, left: 0 }}
            className="pointer-events-none absolute whitespace-nowrap rounded-pill bg-[#e7eaef] px-[36px] py-[25px] text-[22px] font-medium leading-none tracking-[-0.02em] text-white opacity-0 transition-opacity duration-300 will-change-transform data-[active=true]:bg-black"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Copy — in front, but pointer-events-none so drags pass through to the
          physics layer; only the CTA / email links are interactive. */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-[120px] text-center">
        <h2 className="font-display text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
          Offload your <em className="text-orange">people stack</em> in 30 minutes.
        </h2>
        <p className="mt-6 max-w-[560px] text-[18px] leading-[1.55] text-grey-text">
          Free 30-minute call. We&apos;ll show you exactly what we&apos;d take over — benefits,
          compliance, payroll, onboarding — and how much you&apos;d save. No commitment.
        </p>
        <Link
          href="/request-a-demo"
          className="pointer-events-auto mt-9 rounded-pill bg-orange px-[30px] py-[18px] text-[18px] font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Request your free audit →
        </Link>
        <p className="mt-6 text-[15px] text-grey-text">
          Or email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="pointer-events-auto font-medium text-ink underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly
        </p>
      </div>
    </section>
  );
}
