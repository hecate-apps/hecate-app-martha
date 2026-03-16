import { writable, derived } from 'svelte/store';
import { getApi } from '../shared/api.js';
import { hasFlag, VL_DISCOVERING, VL_DISCOVERY_PAUSED, VL_ARCHIVED } from '../types.js';
import type { Venture, Division } from '../types.js';

// --- State ---
export const ventures = writable<Venture[]>([]);
export const activeVenture = writable<Venture | null>(null);
export const divisions = writable<Division[]>([]);
export const selectedDivisionId = writable<string | null>(null);
export const isLoading = writable(false);
export const ventureError = writable<string | null>(null);

// --- Derived ---
export const selectedDivision = derived(
	[divisions, selectedDivisionId],
	([$divisions, $id]) => $divisions.find((d) => d.division_id === $id) ?? null
);

/** Derives a human-readable step name from the active venture's status + phase. */
export const ventureStep = derived(
	activeVenture,
	($v) => {
		if (!$v) return 'none';
		if (hasFlag($v.status, VL_ARCHIVED)) return 'archived';
		if (hasFlag($v.status, VL_DISCOVERY_PAUSED)) return 'discovery_paused';
		if (hasFlag($v.status, VL_DISCOVERING)) return 'discovering';
		// Fall back to phase string from the server
		return $v.phase || 'initiated';
	}
);

// --- Venture selection ---
export function selectVenture(venture: Venture): void {
	activeVenture.set(venture);
}

export function clearActiveVenture(): void {
	activeVenture.set(null);
}

// --- Actions ---
export async function fetchVentures(): Promise<void> {
	try {
		const api = getApi();
		const resp = await api.get<{ ventures: Venture[] }>('/get_ventures_page');
		ventures.set(resp.ventures);
	} catch {
		ventures.set([]);
	}
}

export async function fetchActiveVenture(): Promise<void> {
	try {
		const api = getApi();
		const resp = await api.get<{ venture: Venture }>('/get_active_venture');
		activeVenture.set(resp.venture);
	} catch {
		activeVenture.set(null);
	}
}

export async function fetchDivisions(ventureId: string): Promise<void> {
	try {
		const api = getApi();
		const resp = await api.get<{ divisions: Division[] }>(
			`/get_discovered_divisions_page/${ventureId}`
		);
		divisions.set(resp.divisions);
	} catch {
		divisions.set([]);
	}
}

export async function initiateVenture(name: string, brief: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		const resp = await api.post<{ venture_id: string; name: string; brief: string; status: number; status_label: string; initiated_at: number; initiated_by: string }>('/initiate_venture', { name, brief, initiated_by: 'hecate-web' });
		// Optimistically add the new venture to the store from the API response,
		// avoiding the race condition where the projection hasn't processed the event yet.
		const newVenture: Venture = {
			venture_id: resp.venture_id,
			name: resp.name,
			vision: '',
			brief: resp.brief || '',
			status: resp.status,
			status_label: resp.status_label,
			phase: 'initiated',
			initiated_at: resp.initiated_at,
			created_at: String(resp.initiated_at),
			updated_at: String(resp.initiated_at)
		};
		ventures.update((v) => [...v, newVenture]);
		activeVenture.set(newVenture);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to initiate venture');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function archiveVenture(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/archive_venture/${ventureId}`, {});
		await fetchVentures();
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to archive venture');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function scaffoldVentureRepo(
	ventureId: string,
	repoPath: string,
	vision?: string,
	name?: string,
	brief?: string
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/scaffold_venture_repo/${ventureId}`, {
			repo_path: repoPath,
			vision_content: vision || undefined,
			venture_name: name || undefined,
			brief: brief || undefined
		});
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to scaffold venture repo');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function startDiscovery(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/start_discovery/${ventureId}`, {});
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to start discovery');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function identifyDivision(
	ventureId: string,
	contextName: string,
	description?: string
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/identify_division/${ventureId}`, {
			context_name: contextName,
			description: description || null,
			identified_by: 'hecate-web'
		});
		await fetchDivisions(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to identify division');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function pauseDiscovery(
	ventureId: string,
	reason?: string
): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/pause_discovery/${ventureId}`, {
			reason: reason || null
		});
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to pause discovery');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function resumeDiscovery(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/resume_discovery/${ventureId}`, {});
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to resume discovery');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function completeDiscovery(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/complete_discovery/${ventureId}`, {});
		await fetchActiveVenture();
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		ventureError.set(err.message || 'Failed to complete discovery');
		return false;
	} finally {
		isLoading.set(false);
	}
}
