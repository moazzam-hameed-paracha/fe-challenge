import { EventEmitter } from "eventemitter3";
import { base64ToArrayBuffer } from "./utils";

/**
 * Events emitted by GPTRealtimeClient.
 */
export interface GPTRealtimeClientEventTypes {
  open: () => void;
  close: (e: CloseEvent) => void;
  error: (e: ErrorEvent) => void;
  /** Streaming text delta */
  "text.delta": (delta: string) => void;
  /** Streaming raw PCM16 audio chunk */
  audio: (data: ArrayBuffer) => void;
  /** Signifies end of audio stream for this turn */
  "audio.done": () => void;
  /** Signifies end of all response modalities */
  done: () => void;
}

export interface GPTRealtimeClientOptions {
  apiKey: string;
  orgId?: string;
  projectId?: string;
}

/**
 * Session update payload shape for GPT Realtime.
 */
export interface GPTSessionConfig {
  voice?: string;
  modalities?: ("text" | "audio")[];
  instructions?: string;
  input_audio_format?: "pcm16";
  output_audio_format?: "pcm16";
  turn_detection?: {
    type: "server_vad";
    prefix_padding_ms: number;
    silence_duration_ms: number;
    create_response: boolean;
  };
}

/**
 * Client for OpenAI GPT Realtime API over WebSocket.
 */
export class GPTRealtimeClient extends EventEmitter<GPTRealtimeClientEventTypes> {
  private ws: WebSocket | null = null;
  private apiKey: string;
  private orgId?: string;
  private projectId?: string;
  private model: string | null = null;
  private config: GPTSessionConfig | null = null;

  constructor(opts: GPTRealtimeClientOptions) {
    super();
    this.apiKey = opts.apiKey;
    this.orgId = opts.orgId;
    this.projectId = opts.projectId;
  }

  /**
   * Connects to the GPT Realtime WebSocket endpoint.
   * Sends a session.update immediately on open.
   */
  public connect(model: string, config: GPTSessionConfig): Promise<boolean> {
    if (this.ws) return Promise.resolve(false);
    this.model = model;
    this.config = config;

    const protocols: string[] = [
      "realtime",
      `openai-insecure-api-key.${this.apiKey}`,
      this.orgId && `openai-organization.${this.orgId}`,
      this.projectId && `openai-project.${this.projectId}`,
      "openai-beta.realtime-v1",
    ].filter(Boolean) as string[];

    return new Promise((resolve, reject) => {
      const url = `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`;
      const ws = new WebSocket(url, protocols);
      this.ws = ws;

      ws.onopen = () => {
        // initialize session
        ws.send(
          JSON.stringify({
            type: "session.update",
            session: this.config,
          })
        );
        this.emit("open");
        resolve(true);
      };

      ws.onerror = (e) => {
        this.emit("error", e as ErrorEvent);
        reject(e);
      };

      ws.onclose = (e) => {
        this.ws = null;
        this.emit("close", e);
      };

      ws.onmessage = (msgEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let evt: any;
        try {
          evt = JSON.parse(msgEvent.data as string);
        } catch {
          return;
        }
        switch (evt.type) {
          case "response.text.delta":
            this.emit("text.delta", evt.delta);
            break;
          case "response.audio.delta": {
            // delta is base64-encoded PCM16
            const ab = base64ToArrayBuffer(evt.delta);
            this.emit("audio", ab);
            break;
          }
          case "response.audio.done":
            this.emit("audio.done");
            break;
          case "response.done":
            this.emit("done");
            break;
          case "error":
            this.emit("error", new ErrorEvent("error", { message: evt.message, error: evt }));
            break;
        }
      };
    });
  }

  /**
   * Disconnects the WebSocket if open.
   */
  public disconnect(): boolean {
    if (!this.ws) return false;
    this.ws.close();
    this.ws = null;
    return true;
  }

  /**
   * Sends audio/video chunks as realtime input. For GPT use, send PCM audio.
   */
  public sendRealtimeInput(chunks: Array<{ mimeType: string; data: string }>): void {
    if (!this.ws) throw new Error("WebSocket is not connected");
    for (const ch of chunks) {
      if (ch.mimeType.startsWith("audio/pcm")) {
        this.ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: ch.data }));
      }
    }
  }

  /**
   * Signals that client audio streaming is complete. Use before requesting a response.
   */
  public commitAudio(): void {
    if (!this.ws) throw new Error("WebSocket is not connected");
    this.ws.send(JSON.stringify({ type: "input_audio_buffer.commit" }));
  }

  /**
   * Triggers the assistant's response after committing audio.
   */
  public createResponse(): void {
    if (!this.ws) throw new Error("WebSocket is not connected");
    this.ws.send(JSON.stringify({ type: "response.create" }));
  }
}
