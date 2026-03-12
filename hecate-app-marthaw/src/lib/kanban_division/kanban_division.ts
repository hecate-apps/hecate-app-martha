import { writable, derived } from 'svelte/store';
import { getApi } from '../shared/api.js';

// --- Bit Flags (match kanban_card_status.hrl) ---
export const CARD_POSTED = 1;
export const CARD_PICKED = 2;
export const CARD_FINISHED = 4;
export const CARD_PARKED = 8;
export const CARD_BLOCKED = 16;

// --- Types ---
export interface KanbanCard {
	card_id: string;
	division_id: string;
	title: string;
	description: string | null;
	card_type: 'cmd_desk' | 'prj_desk' | 'qry_desk';
	status: number;
	status_text: string;
	posted_by: string | null;
	posted_at: number | null;
	picked_by: string | null;
	picked_at: number | null;
	finished_at: number | null;
	parked_by: string | null;
	parked_at: number | null;
	park_reason: string | null;
	blocked_by: string | null;
	blocked_at: number | null;
	block_reason: string | null;
}

export interface KanbanBoard {
	division_id: string;
	venture_id: string;
	context_name: string;
	status: number;
	status_label: string;
	initiated_at: number | null;
	initiated_by: string | null;
}

// --- State ---
export const kanbanBoard = writable<KanbanBoard | null>(null);
export const kanbanCards = writable<KanbanCard[]>([]);
export const kanbanError = writable<string | null>(null);
export const kanbanLoading = writable(false);

// --- Derived: cards grouped by bit-flag status ---
export const postedCards = derived(kanbanCards, ($cards) =>
	$cards.filter(
		(c) =>
			(c.status & CARD_PARKED) === 0 &&
			(c.status & CARD_BLOCKED) === 0 &&
			(c.status & CARD_PICKED) === 0 &&
			(c.status & CARD_FINISHED) === 0
	)
);

export const pickedCards = derived(kanbanCards, ($cards) =>
	$cards.filter(
		(c) =>
			(c.status & CARD_PICKED) !== 0 &&
			(c.status & CARD_PARKED) === 0 &&
			(c.status & CARD_BLOCKED) === 0 &&
			(c.status & CARD_FINISHED) === 0
	)
);

export const finishedCards = derived(kanbanCards, ($cards) =>
	$cards.filter((c) => (c.status & CARD_FINISHED) !== 0)
);

export const parkedCards = derived(kanbanCards, ($cards) =>
	$cards.filter((c) => (c.status & CARD_PARKED) !== 0 && (c.status & CARD_FINISHED) === 0)
);

export const blockedCards = derived(kanbanCards, ($cards) =>
	$cards.filter((c) => (c.status & CARD_BLOCKED) !== 0 && (c.status & CARD_FINISHED) === 0)
);

export const cardCounts = derived(kanbanCards, ($cards) => {
	let posted = 0,
		picked = 0,
		finished = 0,
		parked = 0,
		blocked = 0;
	for (const c of $cards) {
		if (c.status & CARD_FINISHED) {
			finished++;
		} else if (c.status & CARD_PARKED) {
			parked++;
		} else if (c.status & CARD_BLOCKED) {
			blocked++;
		} else if (c.status & CARD_PICKED) {
			picked++;
		} else {
			posted++;
		}
	}
	return { posted, picked, finished, parked, blocked, total: $cards.length };
});

// --- Actions ---
export async function fetchKanban(divisionId: string): Promise<void> {
	try {
		kanbanLoading.set(true);
		kanbanError.set(null);
		const api = getApi();
		const resp = await api.get<{ board: KanbanBoard; cards: KanbanCard[] }>(
			`/kanbans/${divisionId}`
		);
		kanbanBoard.set(resp.board);
		kanbanCards.set(resp.cards ?? []);
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to fetch kanban board');
		kanbanBoard.set(null);
		kanbanCards.set([]);
	} finally {
		kanbanLoading.set(false);
	}
}

export async function postCard(
	divisionId: string,
	data: { title: string; description?: string; card_type: string; posted_by?: string }
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards`, data);
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to post card');
		return false;
	}
}

export async function pickCard(
	divisionId: string,
	cardId: string,
	pickedBy: string = 'hecate-web'
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/pick`, {
			picked_by: pickedBy
		});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to pick card');
		return false;
	}
}

export async function finishCard(
	divisionId: string,
	cardId: string
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/finish`, {});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to finish card');
		return false;
	}
}

export async function unpickCard(
	divisionId: string,
	cardId: string,
	reason: string
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/unpick`, { reason });
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to unpick card');
		return false;
	}
}

export async function parkCard(
	divisionId: string,
	cardId: string,
	reason: string,
	parkedBy: string = 'hecate-web'
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/park`, {
			reason,
			parked_by: parkedBy
		});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to park card');
		return false;
	}
}

export async function unparkCard(
	divisionId: string,
	cardId: string
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/unpark`, {});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to unpark card');
		return false;
	}
}

export async function blockCard(
	divisionId: string,
	cardId: string,
	reason: string,
	blockedBy: string = 'hecate-web'
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/block`, {
			reason,
			blocked_by: blockedBy
		});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to block card');
		return false;
	}
}

export async function unblockCard(
	divisionId: string,
	cardId: string
): Promise<boolean> {
	try {
		kanbanError.set(null);
		const api = getApi();
		await api.post(`/kanbans/${divisionId}/cards/${cardId}/unblock`, {});
		await fetchKanban(divisionId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		kanbanError.set(err.message || 'Failed to unblock card');
		return false;
	}
}
