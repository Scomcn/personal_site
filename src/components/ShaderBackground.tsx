"use client";

import { useEffect, useRef } from "react";
import styles from "./ShaderBackground.module.scss";

export type ShaderBackgroundProps = {
  /** Extra class names for the canvas element */
  className?: string;
  /** Animation speed multiplier. Default 0.035. Use 0 to freeze (aside from reduced-motion). */
  speed?: number;
  /** Rainbow tint strength. Default 0.05. Higher = more visible colour. */
  intensity?: number;
  /** Horizontal wave density. Default 2.2. Lower = wider bands. */
  waveFrequency?: number;
  /** Wave edge softness. Default 2.8. Higher = softer transitions. */
  waveSoftness?: number;
  /** Horizontal parallax from mouse (0–1 viewport). Default 0.08. Set 0 to disable. */
  mouseInfluence?: number;
  /** How quickly mouse position eases. Default 0.03. */
  mouseSmoothing?: number;
  /** Noise drift strength. Default 0.09. */
  drift?: number;
  /** Secondary colour haze. Default 0.02. */
  haze?: number;
  /** Edge darkening strength. Default 0.45. */
  vignette?: number;
  /** Background colour as hex (e.g. "#05060c"). Default "#05060c". */
  baseColor?: string;
  /** Cap device pixel ratio for performance. Default 2. */
  maxDpr?: number;
};

type ShaderConfig = Required<
  Omit<ShaderBackgroundProps, "className">
>;

const DEFAULTS: ShaderConfig = {
  speed: 0.04,
  intensity: 0.42,
  waveFrequency: 1.75,
  waveSoftness: 2.0,
  mouseInfluence: 0.08,
  mouseSmoothing: 0.03,
  drift: 0.11,
  haze: 0.16,
  vignette: 0.35,
  baseColor: "#05060c",
  maxDpr: 2,
};

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_speed;
  uniform float u_intensity;
  uniform float u_waveFrequency;
  uniform float u_waveSoftness;
  uniform float u_mouseInfluence;
  uniform float u_drift;
  uniform float u_haze;
  uniform float u_vignette;
  uniform vec3 u_baseColor;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 darkRainbow(float hue, float saturation, float value) {
    return hsv2rgb(vec3(fract(hue), saturation, value));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
    float t = u_time * u_speed;
    float mouseShift = (u_mouse.x - 0.5) * u_mouseInfluence;

    vec2 p = uv;
    p.x += mouseShift;

    float drift = fbm(vec2(p.x * 0.9 + t * 0.4, p.y * 1.1 + 2.0)) * u_drift;
    p.x += drift;

    float soft = fbm(p * 1.2 + vec2(t * 0.25, 0.0)) * 0.14;
    float wave = sin(p.x * u_waveFrequency + soft + t);
    float glow = pow(0.5 + 0.5 * wave, u_waveSoftness);
    glow = smoothstep(0.18, 0.92, glow);

    float hue = fract(
      p.x * 0.38 +
      p.y * 0.16 +
      t * 0.09 +
      soft * 0.22 +
      drift * 1.35
    );
    vec3 rainbow = darkRainbow(hue, 0.86, 0.56);

    vec3 col = mix(u_baseColor, rainbow, glow * u_intensity);
    col += rainbow * (0.08 + glow * 0.06) * u_intensity;

    float hazeSample = fbm(p * 0.62 + vec2(t * 0.12, t * 0.04));
    float hazeHue = fract(hue + 0.47 + hazeSample * 0.35);
    vec3 hazeColor = darkRainbow(hazeHue, 0.72, 0.4);
    col = mix(col, hazeColor, hazeSample * u_haze);

    float vignette = 1.0 - dot(uv * 0.68, uv * 0.68) * u_vignette;
    col *= 0.88 + vignette * 0.1;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
        .split("")
        .map((c) => c + c)
        .join("")
      : normalized;
  const int = Number.parseInt(value, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255].map((c) => c / 255) as [
    number,
    number,
    number,
  ];
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

export default function ShaderBackground({
  className,
  speed = DEFAULTS.speed,
  intensity = DEFAULTS.intensity,
  waveFrequency = DEFAULTS.waveFrequency,
  waveSoftness = DEFAULTS.waveSoftness,
  mouseInfluence = DEFAULTS.mouseInfluence,
  mouseSmoothing = DEFAULTS.mouseSmoothing,
  drift = DEFAULTS.drift,
  haze = DEFAULTS.haze,
  vignette = DEFAULTS.vignette,
  baseColor = DEFAULTS.baseColor,
  maxDpr = DEFAULTS.maxDpr,
}: ShaderBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const configRef = useRef<ShaderConfig>({ ...DEFAULTS });

  configRef.current = {
    speed,
    intensity,
    waveFrequency,
    waveSoftness,
    mouseInfluence,
    mouseSmoothing,
    drift,
    haze,
    vignette,
    baseColor,
    maxDpr,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      speed: gl.getUniformLocation(program, "u_speed"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      waveFrequency: gl.getUniformLocation(program, "u_waveFrequency"),
      waveSoftness: gl.getUniformLocation(program, "u_waveSoftness"),
      mouseInfluence: gl.getUniformLocation(program, "u_mouseInfluence"),
      drift: gl.getUniformLocation(program, "u_drift"),
      haze: gl.getUniformLocation(program, "u_haze"),
      vignette: gl.getUniformLocation(program, "u_vignette"),
      baseColor: gl.getUniformLocation(program, "u_baseColor"),
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, configRef.current.maxDpr);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let targetMouseX = 0.5;
    let currentMouseX = 0.5;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
    };

    const draw = (now: number) => {
      const cfg = configRef.current;
      const [r, g, b] = hexToRgb(cfg.baseColor);
      const t = reducedMotion ? 0 : (now - start) / 1000;

      if (cfg.mouseInfluence > 0) {
        currentMouseX += (targetMouseX - currentMouseX) * cfg.mouseSmoothing;
      }

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, t);
      gl.uniform2f(uniforms.mouse, currentMouseX, 0.5);
      gl.uniform1f(uniforms.speed, cfg.speed);
      gl.uniform1f(uniforms.intensity, cfg.intensity);
      gl.uniform1f(uniforms.waveFrequency, cfg.waveFrequency);
      gl.uniform1f(uniforms.waveSoftness, cfg.waveSoftness);
      gl.uniform1f(uniforms.mouseInfluence, cfg.mouseInfluence);
      gl.uniform1f(uniforms.drift, cfg.drift);
      gl.uniform1f(uniforms.haze, cfg.haze);
      gl.uniform1f(uniforms.vignette, cfg.vignette);
      gl.uniform3f(uniforms.baseColor, r, g, b);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = (now: number) => {
      draw(now);
      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ? `${styles.canvas} ${className}` : styles.canvas}
      aria-hidden
      tabIndex={-1}
    />
  );
}

export { DEFAULTS as shaderBackgroundDefaults };
