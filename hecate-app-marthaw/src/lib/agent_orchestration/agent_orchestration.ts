import { writable, derived } from 'svelte/store';
import { getApi } from '../shared/api.js';

// --- Types ---

export type AgentRole =
	| 'visionary'
	| 'explorer'
	| 'stormer'
	| 'architect'
	| 'erlang_coder'
	| 'svelte_coder'
	| 'sql_coder'
	| 'tester'
	| 'reviewer'
	| 'delivery'
	| 'coordinator'
	| 'mentor';

export type SessionStatus =
	| 'pending'
	| 'running'
	| 'completed'
	| 'failed'
	| 'gate_pending'
	| 'gate_passed'
	| 'gate_rejected'
	| 'archived';

export interface AgentSession {
	session_id: string;
	venture_id: string;
	division_id: string | null;
	role: AgentRole;
	status: SessionStatus;
	started_at: number | null;
	completed_at: number | null;
	tokens_in: number;
	tokens_out: number;
	output: string | null;
	error: string | null;
	gate_output: string | null;
}

export interface AgentTurn {
	turn_id: string;
	session_id: string;
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp: number;
}

export interface RoleStatus {
	role: AgentRole;
	label: string;
	tier: 'creative' | 'mechanical' | 'always_on';
	status: 'idle' | 'running' | 'completed' | 'failed' | 'gate_pending';
	active_session: AgentSession | null;
	session_count: number;
}

// --- Role metadata ---
export const ROLE_META: Record<AgentRole, { label: string; tier: 'creative' | 'mechanical' | 'always_on'; icon: string }> = {
	visionary: { label: 'Visionary', tier: 'creative', icon: '\u{25C7}' },
	explorer: { label: 'Explorer', tier: 'creative', icon: '\u{1F50D}' },
	stormer: { label: 'Stormer', tier: 'creative', icon: '\u{26A1}' },
	reviewer: { label: 'Reviewer', tier: 'creative', icon: '\u{1F50E}' },
	architect: { label: 'Architect', tier: 'mechanical', icon: '\u{25B3}' },
	erlang_coder: { label: 'Erl Coder', tier: 'mechanical', icon: '\u{2699}' },
	svelte_coder: { label: 'Svlt Coder', tier: 'mechanical', icon: '\u{2B21}' },
	sql_coder: { label: 'SQL Coder', tier: 'mechanical', icon: '\u{25A3}' },
	tester: { label: 'Tester', tier: 'mechanical', icon: '\u{2713}' },
	delivery: { label: 'Delivery', tier: 'mechanical', icon: '\u{2192}' },
	coordinator: { label: 'Coordinator', tier: 'always_on', icon: '\u{1F4AC}' },
	mentor: { label: 'Mentor', tier: 'always_on', icon: '\u{1F4AC}' }
};

export const ALL_ROLES: AgentRole[] = [
	'visionary', 'explorer', 'stormer', 'reviewer',
	'architect', 'erlang_coder', 'svelte_coder', 'sql_coder', 'tester', 'delivery',
	'coordinator', 'mentor'
];

// --- State ---
export const agentSessions = writable<AgentSession[]>([]);
export const agentRoleStatuses = writable<RoleStatus[]>([]);
export const agentError = writable<string | null>(null);
export const agentLoading = writable(false);
export const selectedSession = writable<AgentSession | null>(null);
export const sessionTurns = writable<AgentTurn[]>([]);
export const pendingGates = writable<AgentSession[]>([]);

// --- Derived ---
export const creativeRoles = derived(agentRoleStatuses, ($roles) =>
	$roles.filter((r) => ROLE_META[r.role]?.tier === 'creative')
);

export const mechanicalRoles = derived(agentRoleStatuses, ($roles) =>
	$roles.filter((r) => ROLE_META[r.role]?.tier === 'mechanical')
);

export const alwaysOnRoles = derived(agentRoleStatuses, ($roles) =>
	$roles.filter((r) => ROLE_META[r.role]?.tier === 'always_on')
);

export const hasPendingGates = derived(pendingGates, ($gates) => $gates.length > 0);

// --- Actions ---

export async function fetchAgentSessions(ventureId: string): Promise<void> {
	try {
		agentLoading.set(true);
		agentError.set(null);
		const api = getApi();
		const resp = await api.get<{ sessions: AgentSession[] }>(
			`/ventures/${ventureId}/agents/sessions`
		);
		agentSessions.set(resp.sessions ?? []);
		deriveRoleStatuses(resp.sessions ?? []);
		derivePendingGates(resp.sessions ?? []);
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to fetch agent sessions');
	} finally {
		agentLoading.set(false);
	}
}

export async function fetchActiveSessions(ventureId: string): Promise<void> {
	try {
		agentError.set(null);
		const api = getApi();
		const resp = await api.get<{ sessions: AgentSession[] }>(
			`/ventures/${ventureId}/agents/sessions/active`
		);
		agentSessions.set(resp.sessions ?? []);
		deriveRoleStatuses(resp.sessions ?? []);
		derivePendingGates(resp.sessions ?? []);
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to fetch active sessions');
	}
}

export async function fetchSessionDetail(ventureId: string, sessionId: string): Promise<void> {
	try {
		agentError.set(null);
		const api = getApi();
		const resp = await api.get<{ session: AgentSession }>(
			`/ventures/${ventureId}/agents/sessions/${sessionId}`
		);
		selectedSession.set(resp.session);
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to fetch session detail');
	}
}

export async function fetchSessionTurns(ventureId: string, sessionId: string): Promise<void> {
	try {
		const api = getApi();
		const resp = await api.get<{ turns: AgentTurn[] }>(
			`/ventures/${ventureId}/agents/sessions/${sessionId}/turns`
		);
		sessionTurns.set(resp.turns ?? []);
	} catch {
		sessionTurns.set([]);
	}
}

export async function initiateAgent(ventureId: string, role: AgentRole, divisionId?: string): Promise<boolean> {
	try {
		agentError.set(null);
		const api = getApi();
		const body: Record<string, unknown> = {};
		if (divisionId) body.division_id = divisionId;
		await api.post(`/ventures/${ventureId}/agents/${role}/initiate`, body);
		await fetchAgentSessions(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || `Failed to initiate ${role}`);
		return false;
	}
}

export async function passGate(ventureId: string, role: AgentRole, sessionId: string): Promise<boolean> {
	try {
		agentError.set(null);
		const api = getApi();
		await api.post(`/ventures/${ventureId}/agents/${role}/gate/pass`, { session_id: sessionId });
		await fetchAgentSessions(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to pass gate');
		return false;
	}
}

export async function rejectGate(ventureId: string, role: AgentRole, sessionId: string, reason?: string): Promise<boolean> {
	try {
		agentError.set(null);
		const api = getApi();
		await api.post(`/ventures/${ventureId}/agents/${role}/gate/reject`, {
			session_id: sessionId,
			reason
		});
		await fetchAgentSessions(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to reject gate');
		return false;
	}
}

export async function archiveSession(ventureId: string, sessionId: string): Promise<boolean> {
	try {
		agentError.set(null);
		const api = getApi();
		await api.post(`/ventures/${ventureId}/agents/sessions/${sessionId}/archive`, {});
		await fetchAgentSessions(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		agentError.set(err.message || 'Failed to archive session');
		return false;
	}
}

// --- Internal helpers ---

function deriveRoleStatuses(sessions: AgentSession[]): void {
	const statuses: RoleStatus[] = ALL_ROLES.map((role) => {
		const roleSessions = sessions.filter((s) => s.role === role);
		const active = roleSessions.find((s) => s.status === 'running' || s.status === 'gate_pending');
		const lastCompleted = roleSessions
			.filter((s) => s.status === 'completed')
			.sort((a, b) => (b.completed_at ?? 0) - (a.completed_at ?? 0))[0];
		const lastFailed = roleSessions.find((s) => s.status === 'failed');

		let status: RoleStatus['status'] = 'idle';
		if (active?.status === 'gate_pending') status = 'gate_pending';
		else if (active?.status === 'running') status = 'running';
		else if (lastFailed && !lastCompleted) status = 'failed';
		else if (lastCompleted) status = 'completed';

		return {
			role,
			label: ROLE_META[role].label,
			tier: ROLE_META[role].tier,
			status,
			active_session: active ?? lastCompleted ?? lastFailed ?? null,
			session_count: roleSessions.length
		};
	});
	agentRoleStatuses.set(statuses);
}

function derivePendingGates(sessions: AgentSession[]): void {
	pendingGates.set(sessions.filter((s) => s.status === 'gate_pending'));
}
