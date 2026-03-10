import { writable, derived, get } from 'svelte/store';
import type { PhaseCode } from '../types.js';

// Re-export PhaseCode for consumers that imported from here
export type { PhaseCode };

export interface PhaseInfo {
	code: PhaseCode;
	name: string;
	shortName: string;
	description: string;
	role: string;
	color: string;
}

// --- State ---
export const showAIAssist = writable(false);
export const aiAssistContext = writable<string>('');
export const aiAssistAgent = writable<string | null>(null);
export const aiModelOverride = writable<string | null>(null);
export const availableModels = writable<string[]>([]);

// --- Derived ---
export const aiModel = derived(
	[aiModelOverride, availableModels],
	([$override, $models]) => $override ?? $models[0] ?? null
);

// --- Phase Model Preferences ---
const PHASE_MODEL_PREFS_KEY = 'hecate-app-martha-phase-models';

type PhaseModelPrefs = Record<PhaseCode, string | null>;

function loadPhaseModelPrefs(): PhaseModelPrefs {
	try {
		const raw = localStorage.getItem(PHASE_MODEL_PREFS_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			// Migrate old 4-phase prefs to 2-phase
			if ('dna' in parsed && !('planning' in parsed)) {
				return { planning: null, crafting: null };
			}
			return parsed;
		}
	} catch {
		// ignore
	}
	return { planning: null, crafting: null };
}

function savePhaseModelPrefs(prefs: PhaseModelPrefs): void {
	try {
		localStorage.setItem(PHASE_MODEL_PREFS_KEY, JSON.stringify(prefs));
	} catch {
		// ignore
	}
}

export const phaseModelPrefs = writable<PhaseModelPrefs>(loadPhaseModelPrefs());

// --- Model Affinity ---
const CODE_PATTERNS = [
	/code/i, /coder/i, /codestral/i, /starcoder/i,
	/codellama/i, /wizard-?coder/i, /deepseek-coder/i
];

export function modelAffinity(name: string): 'code' | 'general' {
	if (CODE_PATTERNS.some((p) => p.test(name))) return 'code';
	return 'general';
}

export function phaseAffinity(phase: PhaseCode): 'code' | 'general' {
	return phase === 'crafting' ? 'code' : 'general';
}

// --- Actions ---
export function openAIAssist(context: string, agentId?: string): void {
	aiAssistAgent.set(agentId ?? null);
	aiAssistContext.set(context);
	showAIAssist.set(true);
}

export function closeAIAssist(): void {
	showAIAssist.set(false);
	aiAssistAgent.set(null);
}

export function setAIModelOverride(model: string): void {
	aiModelOverride.set(model);
}

export function setPhaseModel(phase: PhaseCode, model: string | null): void {
	phaseModelPrefs.update((prefs) => {
		const updated = { ...prefs, [phase]: model };
		savePhaseModelPrefs(updated);
		return updated;
	});
}

export function parseAgentEvents(text: string): string[] {
	return text
		.split('\n')
		.map((line) => line.replace(/^[\s\-*\u2022\d.]+/, '').trim())
		.filter((line) => line.length > 0 && line.length < 80 && !line.includes(':'))
		.map((line) => line.replace(/["`]/g, ''));
}

// --- Phase Metadata ---
export const PHASES: PhaseInfo[] = [
	{
		code: 'planning',
		name: 'Planning',
		shortName: 'Planning',
		description: 'Design aggregates, plan desks, map dependencies',
		role: 'planning',
		color: 'phase-planning'
	},
	{
		code: 'crafting',
		name: 'Crafting',
		shortName: 'Crafting',
		description: 'Generate code, run tests, deliver releases',
		role: 'crafting',
		color: 'phase-crafting'
	}
];
