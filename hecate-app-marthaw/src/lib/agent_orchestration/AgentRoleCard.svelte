<script lang="ts">
	import type { RoleStatus, AgentRole } from './agent_orchestration.js';
	import { ROLE_META } from './agent_orchestration.js';

	let { roleStatus, onSelect, onInitiate }: {
		roleStatus: RoleStatus;
		onSelect: (role: AgentRole) => void;
		onInitiate: (role: AgentRole) => void;
	} = $props();

	const meta = $derived(ROLE_META[roleStatus.role]);

	const statusIndicator: Record<RoleStatus['status'], { dot: string; label: string }> = {
		idle: { dot: 'bg-surface-500', label: 'Idle' },
		running: { dot: 'bg-hecate-400 animate-pulse', label: 'Active' },
		completed: { dot: 'bg-health-ok', label: 'Done' },
		failed: { dot: 'bg-health-err', label: 'Failed' },
		gate_pending: { dot: 'bg-health-warn animate-pulse', label: 'Gate' }
	};

	const si = $derived(statusIndicator[roleStatus.status]);
</script>

<button
	onclick={() => onSelect(roleStatus.role)}
	class="group relative text-left p-3 rounded-lg border transition-all
		{roleStatus.status === 'gate_pending'
		? 'border-health-warn/50 bg-health-warn/5 shadow-sm shadow-health-warn/10 animate-pulse-subtle'
		: roleStatus.status === 'running'
			? 'border-hecate-500/40 bg-hecate-600/5'
			: 'border-surface-600 bg-surface-800/60 hover:border-surface-500'}"
>
	<!-- Status dot -->
	<div class="flex items-center gap-2 mb-1.5">
		<span class="w-2 h-2 rounded-full {si.dot} shrink-0"></span>
		<span class="text-xs font-semibold text-surface-100 flex-1 truncate">
			{meta.label}
		</span>
		<span class="text-[9px] text-surface-500">{si.label}</span>
	</div>

	<!-- Session info -->
	{#if roleStatus.active_session}
		{@const s = roleStatus.active_session}
		<div class="text-[9px] text-surface-400 space-y-0.5">
			{#if s.tokens_in > 0 || s.tokens_out > 0}
				<div>
					{s.tokens_in.toLocaleString()} in / {s.tokens_out.toLocaleString()} out
				</div>
			{/if}
			{#if roleStatus.session_count > 1}
				<div>{roleStatus.session_count} sessions</div>
			{/if}
		</div>
	{:else}
		<div class="text-[9px] text-surface-500 italic">No sessions</div>
	{/if}

	<!-- Quick initiate on hover (idle only) -->
	{#if roleStatus.status === 'idle'}
		<span
			role="button"
			tabindex="0"
			onclick={(e) => { e.stopPropagation(); onInitiate(roleStatus.role); }}
			onkeydown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onInitiate(roleStatus.role); } }}
			class="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded cursor-pointer
				bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30
				opacity-0 group-hover:opacity-100 transition-opacity"
		>
			Run
		</span>
	{/if}
</button>

<style>
	@keyframes pulse-subtle {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.85; }
	}
	:global(.animate-pulse-subtle) {
		animation: pulse-subtle 2s ease-in-out infinite;
	}
</style>
