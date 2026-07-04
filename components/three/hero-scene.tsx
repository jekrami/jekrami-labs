"use client";

import * as React from "react";
import * as THREE from "three";

/**
 * Hero "system map" — a stable, receding lattice of nodes and hairlines
 * with a handful of telemetry pulses traveling the grid. The structure
 * never moves; only the signals do. That restraint is the point: it is
 * the control-room view of an enterprise system, not a particle toy.
 *
 * - Colors are read live from the palette CSS variables and re-read when
 *   `data-palette` changes on <html>, so all viewer palettes keep working.
 * - `prefers-reduced-motion` renders a single static frame (no RAF loop).
 * - The loop pauses whenever the hero is offscreen or the tab is hidden.
 * - If WebGL is unavailable the component renders nothing and the 2D
 *   hairline grid behind it remains the hero backdrop.
 */

const GRID_COLS = 72;
const GRID_ROWS = 44;
const SPACING = 0.9;
const ACTIVE_NODE_COUNT = 46;
const PULSE_COUNT = 8;

interface PaletteColors {
  primary: THREE.Color;
  accent: THREE.Color;
  background: THREE.Color;
}

function readPalette(): PaletteColors {
  const styles = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => {
    const value = styles.getPropertyValue(name).trim();
    return new THREE.Color(value || fallback);
  };
  return {
    primary: pick("--color-primary", "#0b2545"),
    accent: pick("--color-accent", "#0077b6"),
    background: pick("--color-background", "#ffffff"),
  };
}

/** Small radial-gradient sprite so points render as soft discs, not squares. */
function makeDiscTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.85)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Pulse {
  sprite: THREE.Sprite;
  axis: "x" | "z";
  lane: number;
  progress: number;
  speed: number;
}

export default function HeroScene({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL — the 2D hairline grid stays as the backdrop.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = () => container.clientWidth;
    const height = () => container.clientHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width() / height(), 0.1, 80);
    const cameraBase = new THREE.Vector3(0, 4.6, 16.5);
    const cameraLook = new THREE.Vector3(0, 0.4, 0);
    camera.position.copy(cameraBase);
    camera.lookAt(cameraLook);

    let palette = readPalette();
    scene.fog = new THREE.Fog(palette.background, 9, 30);

    const disc = makeDiscTexture();

    /* ---------------------------------------------------------------- */
    /*  Static lattice: grid points + hairline segments                  */
    /* ---------------------------------------------------------------- */
    const halfW = ((GRID_COLS - 1) * SPACING) / 2;
    const halfD = ((GRID_ROWS - 1) * SPACING) / 2;
    const nodePositions: number[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        nodePositions.push(c * SPACING - halfW, 0, r * SPACING - halfD);
      }
    }
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: palette.primary,
      size: 0.055,
      map: disc,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(nodeGeometry, nodeMaterial));

    const linePositions: number[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const z = r * SPACING - halfD;
      linePositions.push(-halfW, 0, z, halfW, 0, z);
    }
    for (let c = 0; c < GRID_COLS; c++) {
      const x = c * SPACING - halfW;
      linePositions.push(x, 0, -halfD, x, 0, halfD);
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: palette.primary,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    /* ---------------------------------------------------------------- */
    /*  Active nodes: a scattering of accent-coloured instruments        */
    /* ---------------------------------------------------------------- */
    const activePositions: number[] = [];
    for (let i = 0; i < ACTIVE_NODE_COUNT; i++) {
      const c = Math.floor(Math.random() * GRID_COLS);
      const r = Math.floor(Math.random() * GRID_ROWS);
      activePositions.push(c * SPACING - halfW, 0.02, r * SPACING - halfD);
    }
    const activeGeometry = new THREE.BufferGeometry();
    activeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(activePositions, 3));
    const activeMaterial = new THREE.PointsMaterial({
      color: palette.accent,
      size: 0.16,
      map: disc,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(activeGeometry, activeMaterial));

    /* ---------------------------------------------------------------- */
    /*  Telemetry pulses: signals traveling along grid lines             */
    /* ---------------------------------------------------------------- */
    const pulses: Pulse[] = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
      const material = new THREE.SpriteMaterial({
        map: disc,
        color: palette.accent,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.setScalar(0.3);
      scene.add(sprite);
      pulses.push({
        sprite,
        axis: Math.random() > 0.5 ? "x" : "z",
        lane: 0,
        progress: Math.random(),
        speed: 0.04 + Math.random() * 0.05,
      });
      resetPulse(pulses[i]);
    }

    function resetPulse(pulse: Pulse) {
      pulse.axis = Math.random() > 0.5 ? "x" : "z";
      pulse.lane =
        pulse.axis === "x"
          ? Math.floor(Math.random() * GRID_ROWS) * SPACING - halfD
          : Math.floor(Math.random() * GRID_COLS) * SPACING - halfW;
      pulse.progress = 0;
      pulse.speed = 0.04 + Math.random() * 0.05;
    }

    function updatePulses(delta: number) {
      for (const pulse of pulses) {
        pulse.progress += pulse.speed * delta;
        if (pulse.progress >= 1) resetPulse(pulse);
        const travel = pulse.progress * 2 - 1;
        if (pulse.axis === "x") {
          pulse.sprite.position.set(travel * halfW, 0.04, pulse.lane);
        } else {
          pulse.sprite.position.set(pulse.lane, 0.04, travel * halfD);
        }
        // Fade in at the start of a run, out at the end.
        const envelope = Math.sin(pulse.progress * Math.PI);
        pulse.sprite.material.opacity = envelope * 0.9;
      }
    }

    /* ---------------------------------------------------------------- */
    /*  Palette switching                                                 */
    /* ---------------------------------------------------------------- */
    const applyPalette = () => {
      palette = readPalette();
      nodeMaterial.color.copy(palette.primary);
      lineMaterial.color.copy(palette.primary);
      activeMaterial.color.copy(palette.accent);
      for (const pulse of pulses) pulse.sprite.material.color.copy(palette.accent);
      (scene.fog as THREE.Fog).color.copy(palette.background);
      if (reduceMotion) renderer.render(scene, camera);
    };
    const paletteObserver = new MutationObserver(applyPalette);
    paletteObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-palette"],
    });

    /* ---------------------------------------------------------------- */
    /*  Pointer parallax                                                  */
    /* ---------------------------------------------------------------- */
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---------------------------------------------------------------- */
    /*  Render loop — paused when hidden or offscreen                     */
    /* ---------------------------------------------------------------- */
    let frame = 0;
    let running = false;
    let inView = true;
    let lastTime = performance.now();
    let elapsed = 0;

    const renderFrame = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += delta;
      const t = elapsed;

      updatePulses(delta);
      activeMaterial.opacity = 0.65 + Math.sin(t * 1.4) * 0.2;

      camera.position.x += (cameraBase.x + pointer.x * 1.1 - camera.position.x) * 0.03;
      camera.position.y += (cameraBase.y - pointer.y * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(cameraLook);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(renderFrame);
    };

    const syncLoop = () => {
      const shouldRun = inView && !document.hidden && !reduceMotion;
      if (shouldRun && !running) {
        running = true;
        lastTime = performance.now();
        frame = requestAnimationFrame(renderFrame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncLoop();
    });
    intersection.observe(container);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
      if (reduceMotion) renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // First paint: render one frame immediately so the fade-in reveals
    // a finished scene, then let the loop take over. The reveal drives
    // the DOM directly — no React state round-trip for a pure style change.
    updatePulses(0);
    renderer.render(scene, camera);
    container.style.opacity = "1";
    syncLoop();

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      paletteObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
        if (object instanceof THREE.Sprite) object.material.dispose();
      });
      disc.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{
        opacity: 0,
        transition: "opacity 1.4s var(--ease-subtle)",
      }}
    />
  );
}
