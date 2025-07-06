"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";

export default function ChatWindow() {
  const { clientType, gptAPI, liveAPI } = useLiveAPIContext();
  const transcriptions = clientType === "gemini" ? liveAPI.transcriptions : gptAPI.transcriptions;

  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const windowStartRef = useRef({ x: 0, y: 0 });
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // initialize at bottom-right after mount
  useEffect(() => {
    const width = 300;
    setPosition({
      x: window.innerWidth - width - 16,
      y: 100,
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    windowStartRef.current = { ...position };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({ x: windowStartRef.current.x + dx, y: windowStartRef.current.y + dy });
  }, []);

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  /* Commented out auto-scroll to prevent page shift
  useEffect(() => {
    if (isOpen && messageContainerRef.current) {
      const c = messageContainerRef.current;
      c.scrollTop = c.scrollHeight;
    }
  }, [transcriptions, isOpen]);
  */

  const width = 300;
  // Use full viewport height minus margins
  const styleHeight = "calc(100vh - 182px)";

  return isOpen ? (
    <div
      className="fixed flex flex-col bg-red shadow-lg rounded-lg cursor-grab"
      style={{
        top: position.y,
        left: position.x,
        width,
        height: styleHeight,
        zIndex: 1000,
      }}
      onMouseDown={onMouseDown}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg select-none">Chat</div>

      {/* Messages container full height */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-auto p-2 space-y-2 bg-gray-50"
        style={{ height: `calc(${styleHeight} - 96px)` }}
      >
        {transcriptions.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] break-words whitespace-pre-wrap ${
                msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-2 flex justify-end rounded-b-lg h-12">
        <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
          Close
        </button>
      </div>
    </div>
  ) : (
    <button
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
      onClick={() => setIsOpen(true)}
    >
      Chat
    </button>
  );
}
