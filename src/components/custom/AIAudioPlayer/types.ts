/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LiveClientToolResponse, LiveServerMessage, Part } from "@google/genai";

/**
 * the options to initiate the client, ensure apiKey is required
 */
export type LiveClientOptions = { apiKey: string; clientType: "gemini" | "gpt" };

/** log types */
export type StreamingLog = {
  date: Date;
  type: string;
  count?: number;
  message: string | ClientContentLog | Omit<LiveServerMessage, "text" | "data"> | LiveClientToolResponse;
};

export type ClientContentLog = {
  turns: Part[];
  turnComplete: boolean;
};
