"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ArrowUp, Square, Mic, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BAR_MAX_PX = 48;
const BAR_MIN_PX = 4;
const BAR_SLOT_PX = 8;
const MIN_BARS = 16;
const MAX_BARS = 256;

function MicVisualizer({ stream }: { stream: MediaStream | null }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const barsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const [barCount, setBarCount] = React.useState(MIN_BARS);
  const barCountRef = React.useRef(barCount);
  barCountRef.current = barCount;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w <= 0) return;
      const n = Math.max(
        MIN_BARS,
        Math.min(MAX_BARS, Math.floor(w / BAR_SLOT_PX)),
      );
      setBarCount((prev) => (prev === n ? prev : n));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!stream) return;
    const AudioCtor: typeof AudioContext | undefined =
      typeof window !== "undefined"
        ? (window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext)
        : undefined;
    if (!AudioCtor) return;
    const ctx = new AudioCtor();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.6;
    source.connect(analyser);
    const buf = new Uint8Array(analyser.frequencyBinCount);
    const heights = new Float32Array(Math.ceil(MAX_BARS / 2));
    let raf = 0;
    const tick = () => {
      analyser.getByteFrequencyData(buf);
      const n = barCountRef.current;
      const half = Math.ceil(n / 2);
      const step = Math.max(1, Math.floor(buf.length / half));
      for (let k = 0; k < half; k++) {
        let sum = 0;
        for (let j = 0; j < step; j++) sum += buf[k * step + j] ?? 0;
        const avg = sum / step / 255;
        heights[k] = Math.max(BAR_MIN_PX, Math.round(avg * BAR_MAX_PX));
      }
      const center = (n - 1) / 2;
      for (let i = 0; i < n; i++) {
        const idx = Math.min(half - 1, Math.round(Math.abs(i - center)));
        const el = barsRef.current[i];
        if (el) el.style.height = `${heights[idx] ?? BAR_MIN_PX}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      try {
        source.disconnect();
        analyser.disconnect();
      } catch {}
      ctx.close().catch(() => {});
    };
  }, [stream]);

  return (
    <div
      ref={containerRef}
      className="flex h-12 w-full items-center justify-between"
      aria-hidden
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="w-[5px] bg-white/90 rounded-full transition-[height] duration-100 ease-out"
          style={{ height: BAR_MIN_PX }}
        />
      ))}
    </div>
  );
}

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-md bg-zinc-900 text-white px-1.5 py-1 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-zinc-900" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const MAX_RECORDING_MS = 60_000;

function pickAudioMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const m of candidates) {
    if (MediaRecorder.isTypeSupported(m)) return m;
  }
  return "";
}

interface PromptBoxProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  onTranscribe?: (blob: Blob) => Promise<string>;
}

export const PromptBox = React.forwardRef<HTMLTextAreaElement, PromptBoxProps>(
  (
    {
      className,
      placeholder = "Message...",
      disabled,
      onSubmit,
      onStop,
      onTranscribe,
    },
    ref,
  ) => {
    const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = React.useState("");
    const [mode, setMode] = React.useState<
      "idle" | "recording" | "transcribing"
    >("idle");
    const [stream, setStream] = React.useState<MediaStream | null>(null);

    const recorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<BlobPart[]>([]);
    const timeoutRef = React.useRef<number | null>(null);
    const focusOnIdleRef = React.useRef(false);
    const stopRequestedRef = React.useRef(false);
    const modeRef = React.useRef(mode);
    modeRef.current = mode;

    React.useImperativeHandle(ref, () => internalTextareaRef.current!, []);

    const resizeTextarea = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        if (!node) return;
        node.style.height = "auto";
        const maxPx =
          typeof window !== "undefined"
            ? Math.floor(window.innerHeight * 0.5)
            : 400;
        node.style.height = `${Math.min(node.scrollHeight, maxPx)}px`;
      },
      [],
    );

    const attachTextarea = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalTextareaRef.current = node;
        resizeTextarea(node);
      },
      [resizeTextarea],
    );

    React.useLayoutEffect(() => {
      if (mode !== "idle") return;
      resizeTextarea(internalTextareaRef.current);
      if (focusOnIdleRef.current) {
        focusOnIdleRef.current = false;
        const ta = internalTextareaRef.current;
        if (ta) {
          ta.focus();
          const end = ta.value.length;
          ta.setSelectionRange(end, end);
        }
      }
    }, [value, mode, resizeTextarea]);

    const cleanupRecording = React.useCallback(() => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const rec = recorderRef.current;
      if (rec) {
        rec.stream.getTracks().forEach((t) => t.stop());
        recorderRef.current = null;
      }
      setStream(null);
      chunksRef.current = [];
    }, []);

    React.useEffect(() => {
      return () => {
        const rec = recorderRef.current;
        if (rec && rec.state !== "inactive") {
          try {
            rec.stop();
          } catch {}
        }
        cleanupRecording();
      };
    }, [cleanupRecording]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    const handleSubmit = () => {
      if (!value.trim() || disabled) return;
      onSubmit?.(value);
      setValue("");
    };

    const transcribeBlob = async (blob: Blob) => {
      if (!onTranscribe) {
        setMode("idle");
        return;
      }
      setMode("transcribing");
      try {
        const spoken = (await onTranscribe(blob)).trim();
        if (!spoken) return;
        setValue((prev) =>
          prev.trim() ? `${prev.trimEnd()} ${spoken}` : spoken,
        );
        focusOnIdleRef.current = true;
      } catch (err) {
        console.error("[transcribe] failed", err);
      } finally {
        setMode("idle");
      }
    };

    const stopRecording = React.useCallback(() => {
      const rec = recorderRef.current;
      if (rec && rec.state !== "inactive") {
        try {
          rec.stop();
        } catch (err) {
          console.error("[mic] stop failed", err);
          cleanupRecording();
          setMode("idle");
        }
      }
    }, [cleanupRecording]);

    const startRecording = async () => {
      if (disabled || modeRef.current !== "idle") return;
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        console.error("[mic] getUserMedia unavailable");
        return;
      }
      let micStream: MediaStream;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error("[mic] permission denied", err);
        stopRequestedRef.current = false;
        return;
      }
      setStream(micStream);
      const mime = pickAudioMime();
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(micStream, mime ? { mimeType: mime } : undefined);
      } catch (err) {
        console.error("[mic] MediaRecorder ctor failed", err);
        cleanupRecording();
        return;
      }
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || mime || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        cleanupRecording();
        if (blob.size > 0) {
          void transcribeBlob(blob);
        } else {
          setMode("idle");
        }
      };
      recorder.onerror = (e) => {
        console.error("[mic] recorder error", e);
      };
      recorderRef.current = recorder;
      recorder.start();
      setMode("recording");
      timeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, MAX_RECORDING_MS);
      if (stopRequestedRef.current) {
        stopRequestedRef.current = false;
        stopRecording();
      }
    };

    const handleToggleMic = () => {
      if (mode === "recording") {
        stopRecording();
      } else {
        void startRecording();
      }
    };

    const startRef = React.useRef(startRecording);
    const stopRef = React.useRef(stopRecording);
    startRef.current = startRecording;
    stopRef.current = stopRecording;

    React.useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Alt" || e.repeat) return;
        if (disabled) return;
        if (modeRef.current !== "idle") return;
        e.preventDefault();
        stopRequestedRef.current = false;
        void startRef.current();
      };
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key !== "Alt") return;
        if (modeRef.current === "recording") {
          stopRef.current();
        } else if (modeRef.current === "idle") {
          stopRequestedRef.current = true;
        }
      };
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [disabled]);

    const hasValue = value.trim().length > 0;
    const micDisabled = disabled || mode === "transcribing";

    const motionTransition = { duration: 0.18, ease: "easeOut" as const };

    return (
      <div
        className={cn(
          "relative flex flex-col rounded-2xl p-2.5 transition-all duration-200 bg-[#242424] border border-white/[0.06] shadow-lg shadow-black/20 cursor-text focus-within:border-white/15 focus-within:ring-1 focus-within:ring-white/10",
          mode === "recording" && "border-red-500/40",
          className,
        )}
      >
        {mode === "recording" && (
          <motion.span
            key="record-pulse"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            initial={{ boxShadow: "0 0 0 0 rgba(239,68,68,0.0)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(239,68,68,0.45)",
                "0 0 0 14px rgba(239,68,68,0)",
              ],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {mode === "recording" ? (
            <motion.div
              key="recording"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={motionTransition}
              className="flex items-center gap-2 px-2 py-2 min-h-[80px]"
            >
              <div className="flex-1 flex items-center overflow-hidden">
                <MicVisualizer stream={stream} />
              </div>
              <button
                type="button"
                onClick={stopRecording}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                <span className="sr-only">Stop dictation</span>
              </button>
            </motion.div>
          ) : mode === "transcribing" ? (
            <motion.div
              key="transcribing"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={motionTransition}
              className="flex items-center justify-center gap-2 px-2 py-2 min-h-[80px] text-sm text-text-secondary"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Transcribing…</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={motionTransition}
            >
              <textarea
                ref={attachTextarea}
                rows={1}
                value={value}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full resize-none border-0 bg-transparent px-3 py-3 text-[15px] text-white placeholder:text-text-secondary focus:ring-0 focus-visible:outline-none min-h-14"
              />

              <div className="p-1 pt-0">
                <TooltipProvider delayDuration={100}>
                  <div className="flex items-center gap-1.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={handleToggleMic}
                          disabled={micDisabled}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 text-text-secondary hover:bg-white/5",
                          )}
                        >
                          <Mic className="h-3.5 w-3.5" />
                          <span className="sr-only">Start dictation</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" showArrow={true}>
                        <p>Click to dictate, or hold Option to speak</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="ml-auto">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {disabled && onStop ? (
                            <button
                              type="button"
                              onClick={onStop}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 bg-red-500 text-white hover:bg-red-500/90"
                            >
                              <Square className="w-3 h-3 fill-current" />
                              <span className="sr-only">Stop</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSubmit}
                              disabled={!hasValue || disabled}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-text-muted"
                            >
                              <ArrowUp className="h-5 w-5" />
                              <span className="sr-only">Send message</span>
                            </button>
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="top" showArrow={true}>
                          <p>{disabled && onStop ? "Stop" : "Send"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TooltipProvider>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
PromptBox.displayName = "PromptBox";
