import { writable, get } from 'svelte/store';
import { getApi } from './api.js';
import { activeVenture, divisions, fetchDivisions } from '../guide_venture/guide_venture.js';
import type { PhaseCode } from '../types.js';

// --- State ---
export const selectedPhase = writable<PhaseCode>('planning');
export const phaseError = writable<string | null>(null);
export const isLoading = writable(false);

/** Map phase code to its API path prefix */
function phaseApiPrefix(phase: PhaseCode): string {
	return phase === 'planning' ? 'plannings' : 'craftings';
}

// --- Actions ---
export async function openPhase(
	divisionId: string,
	phase: PhaseCode
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/api/${phaseApiPrefix(phase)}/${divisionId}/open`, {});
		const v = get(activeVenture);
		if (v) await fetchDivisions(v.venture_id);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		phaseError.set(err.message || `Failed to open ${phase}`);
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function shelvePhase(
	divisionId: string,
	phase: PhaseCode,
	reason?: string
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/api/${phaseApiPrefix(phase)}/${divisionId}/shelve`, {
			reason: reason || null
		});
		const v = get(activeVenture);
		if (v) await fetchDivisions(v.venture_id);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		phaseError.set(err.message || `Failed to shelve ${phase}`);
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function resumePhase(
	divisionId: string,
	phase: PhaseCode
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/api/${phaseApiPrefix(phase)}/${divisionId}/resume`, {});
		const v = get(activeVenture);
		if (v) await fetchDivisions(v.venture_id);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		phaseError.set(err.message || `Failed to resume ${phase}`);
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function concludePhase(
	divisionId: string,
	phase: PhaseCode
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/api/${phaseApiPrefix(phase)}/${divisionId}/conclude`, {});
		const v = get(activeVenture);
		if (v) await fetchDivisions(v.venture_id);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		phaseError.set(err.message || `Failed to conclude ${phase}`);
		return false;
	} finally {
		isLoading.set(false);
	}
}
