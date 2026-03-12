<script lang="ts">
	import { activeVenture } from '$lib/guide_venture/guide_venture.js';
	import {
		agentRoleStatuses,
		agentError,
		agentLoading,
		creativeRoles,
		mechanicalRoles,
		alwaysOnRoles,
		pendingGates,
		selectedSession,
		sessionTurns,
		fetchAgentSessions,
		fetchSessionDetail,
		fetchSessionTurns,
		initiateAgent,
		passGate,
		rejectGate,
		archiveSession,
		type AgentRole
	} from './agent_orchestration.js';
	import AgentRoleCard from './AgentRoleCard.svelte';
	import GateReview from './GateReview.svelte';
	import AgentSessionDetail from './AgentSessionDetail.svelte';

	// Fetch sessions when venture changes
	let lastVid = $state<string | null>(null);
	$effect(() => {
		const v = $activeVenture;
		if (v && v.venture_id !== lastVid) {
			lastVid = v.venture_id;
			fetchAgentSessions(v.venture_id);
		}
	});

	// Poll for active sessions every 10s
	let pollTimer: ReturnType<typeof setInterval> | undefined;
	$effect(() => {
		const v = $activeVenture;
		if (v) {
			pollTimer = setInterval(() => fetchAgentSessions(v.venture_id), 10000);
			return () => { if (pollTimer) clearInterval(pollTimer); };
		}
	});

	let showDetail = $state(false);

	function vid(): string {
		return $activeVenture?.venture_id ?? '';
	}

	async function handleSelectRole(role: AgentRole) {
		const rs = $agentRoleStatuses.find((r) => r.role === role);
		if (rs?.active_session) {
			await fetchSessionDetail(vid(), rs.active_session.session_id);
			if (role === 'coordinator' || role === 'mentor') {
				await fetchSessionTurns(vid(), rs.active_session.session_id);
			}
			showDetail = true;
		}
	}

	async function handleInitiate(role: AgentRole) {
		await initiateAgent(vid(), role);
	}

	async function handlePassGate(session_id: string, role: AgentRole) {
		await passGate(vid(), role, session_id);
	}

	async function handleRejectGate(session_id: string, role: AgentRole, reason: string) {
		await rejectGate(vid(), role, session_id, reason);
	}

	async function handleArchive() {
		const s = $selectedSession;
		if (s) {
			await archiveSession(vid(), s.session_id);
			showDetail = false;
			selectedSession.set(null);
		}
	}
</script>

{#if showDetail && $selectedSession}
	<AgentSessionDetail
		session={$selectedSession}
		turns={$sessionTurns}
		onClose={() => { showDetail = false; selectedSession.set(null); }}
		onArchive={handleArchive}
	/>
{:else}
	<div class="p-4 space-y-4 overflow-y-auto h-full">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-sm font-semibold text-surface-100">Agent Pipeline</h3>
				<p class="text-[11px] text-surface-400 mt-0.5">
					12 roles across the venture lifecycle
				</p>
			</div>
			{#if $agentLoading}
				<span class="text-[10px] text-surface-400 animate-pulse">Refreshing...</span>
			{/if}
		</div>

		<!-- Error -->
		{#if $agentError}
			<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2">
				{$agentError}
			</div>
		{/if}

		<!-- Pending gates (prominent) -->
		{#if $pendingGates.length > 0}
			<div class="space-y-3">
				{#each $pendingGates as gate (gate.session_id)}
					<GateReview
						session={gate}
						onPass={() => handlePassGate(gate.session_id, gate.role)}
						onReject={(reason) => handleRejectGate(gate.session_id, gate.role, reason)}
					/>
				{/each}
			</div>
		{/if}

		<!-- Tier 1: Creative -->
		<div>
			<h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">
				Tier 1 — Creative
			</h4>
			<div class="grid grid-cols-4 gap-2">
				{#each $creativeRoles as rs (rs.role)}
					<AgentRoleCard
						roleStatus={rs}
						onSelect={handleSelectRole}
						onInitiate={handleInitiate}
					/>
				{/each}
			</div>
		</div>

		<!-- Gate arrows visual hint -->
		<div class="flex items-center gap-2 px-2">
			<div class="flex-1 h-px bg-surface-600"></div>
			<span class="text-[9px] text-surface-500">gate</span>
			<span class="text-surface-500">{'\u{2193}'}</span>
			<div class="flex-1 h-px bg-surface-600"></div>
		</div>

		<!-- Tier 2: Mechanical -->
		<div>
			<h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">
				Tier 2 — Mechanical
			</h4>
			<div class="grid grid-cols-4 gap-2">
				{#each $mechanicalRoles as rs (rs.role)}
					<AgentRoleCard
						roleStatus={rs}
						onSelect={handleSelectRole}
						onInitiate={handleInitiate}
					/>
				{/each}
			</div>
		</div>

		<!-- Always-on -->
		<div>
			<h4 class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">
				Always-On
			</h4>
			<div class="grid grid-cols-4 gap-2">
				{#each $alwaysOnRoles as rs (rs.role)}
					<AgentRoleCard
						roleStatus={rs}
						onSelect={handleSelectRole}
						onInitiate={handleInitiate}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}
