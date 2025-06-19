"use client";

import React, { useState, useMemo, useCallback, FormEventHandler } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { FunctionDeclaration, Tool, Modality } from "@google/genai";
import { cn } from "@/utils";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";

// Combined Settings Modal using Google Modality enum
export default function SettingsModal() {
  const [open, setOpen] = useState(false);
  const { config, setConfig, connected } = useLiveAPIContext();

  // Extract function declarations if any
  const functionDeclarations: FunctionDeclaration[] = useMemo(() => {
    if (!Array.isArray(config.tools)) return [];
    return (config.tools as Tool[])
      .filter((t): t is Tool & { functionDeclarations: FunctionDeclaration[] } =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.isArray((t as any).functionDeclarations)
      )
      .flatMap((t) => t.functionDeclarations);
  }, [config.tools]);

  // System instruction text
  const systemInstruction = useMemo(() => {
    const si = config.systemInstruction;
    if (!si) return "";
    if (typeof si === "string") return si;
    if (Array.isArray(si)) return si.map((p) => (typeof p === "string" ? p : p.text)).join("\n");
    if (typeof si === "object" && "parts" in si) return si.parts?.map((p) => p.text).join("\n") || "";
    return "";
  }, [config.systemInstruction]);

  const updateInstruction: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setConfig({ ...config, systemInstruction: e.currentTarget.value });
    },
    [config, setConfig]
  );

  const updateFunctionDesc = useCallback(
    (name: string, desc: string) => {
      const newTools = config.tools?.map((tool) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = tool as any;
        if (Array.isArray(t.functionDeclarations)) {
          return {
            ...tool,
            functionDeclarations: t.functionDeclarations.map((fd: FunctionDeclaration) =>
              fd.name === name ? { ...fd, description: desc } : fd
            ),
          };
        }
        return tool;
      });
      setConfig({ ...config, tools: newTools });
    },
    [config, setConfig]
  );

  // Response Modality using Modality enum
  const modalities = useMemo(() => [Modality.TEXT, Modality.AUDIO] as const, []);
  const selectedModality = config.responseModalities?.[0] ?? Modality.TEXT;
  const onModalityChange = useCallback(
    (val: Modality) => {
      setConfig({ ...config, responseModalities: [val] });
    },
    [config, setConfig]
  );

  // Voice options
  const voiceOptions = useMemo(() => ["Puck", "Charon", "Kore", "Fenrir", "Aoede", "Atari02"], []);
  const selectedVoice = config.speechConfig?.voiceConfig?.prebuiltVoiceConfig?.voiceName || "Atari02";
  const onVoiceChange = useCallback(
    (val: string) => {
      setConfig({
        ...config,
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: val } } },
      });
    },
    [config, setConfig]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="m-auto">
          <Settings aria-label="Settings" />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("max-w-2xl p-6 space-y-6", connected && "opacity-50 pointer-events-none")}>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your streaming session before connecting.</DialogDescription>
        </DialogHeader>

        {/* Response Modality */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="response-modality">Modality</Label>
            <Select value={selectedModality} onValueChange={onModalityChange}>
              <SelectTrigger id="response-modality" className="h-8">
                <SelectValue placeholder="Choose modality" />
              </SelectTrigger>
              <SelectContent>
                {modalities.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voice Selector */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="voice-select">Voice</Label>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger id="voice-select" className="h-8">
                <SelectValue placeholder="Choose voice" />
              </SelectTrigger>
              <SelectContent>
                {voiceOptions.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* System Instructions */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="sys-instruction">System Instructions</Label>
          <Textarea id="sys-instruction" value={systemInstruction} onChange={updateInstruction} rows={4} />
        </div>

        {/* Function Declarations */}
        {functionDeclarations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Function Declarations</h4>
            <div className="grid grid-cols-[1fr_0.5fr_1.5fr] gap-2 items-center text-sm">
              {functionDeclarations.map((fd, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-mono text-xs font-bold text-blue-400 px-2 py-1 border rounded">{fd.name}</span>
                  <span className="px-2">{Object.keys(fd.parameters?.properties || {}).join(", ")}</span>
                  <input
                    className="bg-transparent border border-slate-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue={fd.description}
                    onBlur={(e) => updateFunctionDesc(fd.name!, e.currentTarget.value)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
