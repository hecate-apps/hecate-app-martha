import { writable } from 'svelte/store';
import { getApi } from '../shared/api.js';

// --- State ---
export const craftError = writable<string | null>(null);

// --- Code Generation ---
export async function generateModule(
	divisionId: string,
	data: { module_name: string; template?: string }
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/api/craftings/${divisionId}/generate-module`, data);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		craftError.set(err.message || 'Failed to generate module');
		return false;
	}
}

export async function generateTest(
	divisionId: string,
	data: { test_module: string; target_module: string }
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/api/craftings/${divisionId}/generate-test`, data);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		craftError.set(err.message || 'Failed to generate test');
		return false;
	}
}

// --- Release Delivery ---
export async function deliverRelease(
	divisionId: string,
	version: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/api/craftings/${divisionId}/deliver-release`, { version });
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		craftError.set(err.message || 'Failed to deliver release');
		return false;
	}
}

export async function stageDelivery(
	divisionId: string,
	data: { release_id: string; stage_name: string }
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/api/craftings/${divisionId}/stage-delivery`, data);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		craftError.set(err.message || 'Failed to stage delivery');
		return false;
	}
}
