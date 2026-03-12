<script lang="ts">
	import type { AgentSession, AgentTurn } from './agent_orchestration.js';
	import { ROLE_META } from './agent_orchestration.js';

	let { session, turns, onClose, onArchive }: {
		session: AgentSession;
		turns: AgentTurn[];
		onClose: () => void;
		onArchive: () => void;
	} = $props();

	const meta = $derived(ROLE_META[session.role]);

	function formatTimestamp(ts: number | null): string {
		if (!ts) return '-';
		return new Date(ts).toLocaleString(undefined, {
			month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
		});
	}

	const statusColor: Record<string, string> = {
		pending: 'text-surface-400',
		running: 'text-hecate-300',
		completed: 'text-health-ok',
		failed: 'text-health-err',
		gate_pending: 'text-health-warn',
		gate_passed: 'text-health-ok',
		gate_rejected: 'text-health-err',
		archived: 'text-surface-500'
	};
</script>

<div class="flex flex-col h-full">
	<!-- Header -->
	<div class="px-4 py-3 border-b border-surface-600 flex items-center gap-3 shrink-0">
		<button
			onclick={onClose}
			class="text-surface-400 hover:text-surface-100 transition-colors text-sm"
		>
			{'\u{2190}'}
		</button>
		<span class="text-sm">{meta.icon}</span>
		<h3 class="text-sm font-semibold text-surface-100">{meta.label} Session</h3>
		<span class="text-[10px] {statusColor[session.status] ?? 'text-surface-400'}">
			{session.status}
		</span>
		<div class="flex-1"></div>
		{#if session.status !== 'archived' && session.status !== 'running'}
			<button
				onclick={onArchive}
				class="text-[10px] px-2 py-0.5 rounded text-surface-400
					hover:text-surface-200 hover:bg-surface-700 transition-colors"
			>
				Archive
			</button>
		{/if}
	</div>

	<!-- Session info -->
	<div class="px-4 py-3 border-b border-surface-600 shrink-0">
		<div class="grid grid-cols-4 gap-3 text-[10px]">
			<div>
				<span class="text-surface-500 block">Started</span>
				<span class="text-surface-200">{formatTimestamp(session.started_at)}</span>
			</div>
			<div>
				<span class="text-surface-500 block">Completed</span>
				<span class="text-surface-200">{formatTimestamp(session.completed_at)}</span>
			</div>
			<div>
				<span class="text-surface-500 block">Tokens In</span>
				<span class="text-surface-200">{session.tokens_in.toLocaleString()}</span>
			</div>
			<div>
				<span class="text-surface-500 block">Tokens Out</span>
				<span class="text-surface-200">{session.tokens_out.toLocaleString()}</span>
			</div>
		</div>
	</div>

	<!-- Output -->
	{#if session.output}
		<div class="px-4 py-3 border-b border-surface-600 shrink-0">
			<h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2">
				Output
			</h4>
			<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-48 overflow-y-auto">
				<pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed">{session.output}</pre>
			</div>
		</div>
	{/if}

	<!-- Error -->
	{#if session.error}
		<div class="px-4 py-3 border-b border-surface-600 shrink-0">
			<div class="text-[10px] text-health-err bg-health-err/10 rounded px-3 py-2">
				{session.error}
			</div>
		</div>
	{/if}

	<!-- Turns (for coordinator/mentor) -->
	{#if turns.length > 0}
		<div class="flex-1 overflow-y-auto px-4 py-3">
			<h4 class="text-[10px] font-semibold text-surface-300 uppercase tracking-wider mb-2">
				Conversation ({turns.length} turns)
			</h4>
			<div class="space-y-2">
				{#each turns as turn (turn.turn_id)}
					<div class="rounded p-2.5
						{turn.role === 'assistant'
						? 'bg-hecate-600/10 border border-hecate-600/20'
						: turn.role === 'user'
							? 'bg-surface-700/50 border border-surface-600'
							: 'bg-surface-800 border border-surface-600/50'}">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-[9px] font-semibold uppercase tracking-wider
								{turn.role === 'assistant' ? 'text-hecate-300' : 'text-surface-400'}">
								{turn.role}
							</span>
							<span class="text-[8px] text-surface-500">
								{new Date(turn.timestamp).toLocaleTimeString()}
							</span>
						</div>
						<pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed">{turn.content}</pre>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="flex-1 flex items-center justify-center text-surface-500 text-xs">
			No conversation turns recorded
		</div>
	{/if}
</div>
