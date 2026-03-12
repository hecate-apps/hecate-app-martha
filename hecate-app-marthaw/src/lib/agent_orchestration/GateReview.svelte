<script lang="ts">
	import type { AgentSession } from './agent_orchestration.js';
	import { ROLE_META } from './agent_orchestration.js';

	let { session, onPass, onReject }: {
		session: AgentSession;
		onPass: () => void;
		onReject: (reason: string) => void;
	} = $props();

	let rejectReason = $state('');
	let showRejectForm = $state(false);

	const meta = $derived(ROLE_META[session.role]);

	function handleReject() {
		if (rejectReason.trim()) {
			onReject(rejectReason.trim());
			rejectReason = '';
			showRejectForm = false;
		}
	}
</script>

<div class="rounded-lg border-2 border-health-warn/40 bg-health-warn/5 p-4 space-y-3">
	<div class="flex items-center gap-2">
		<span class="w-2 h-2 rounded-full bg-health-warn animate-pulse"></span>
		<h4 class="text-xs font-semibold text-health-warn uppercase tracking-wider">
			Gate Review: {meta.label}
		</h4>
		{#if session.division_id}
			<span class="text-[9px] text-surface-400 ml-auto">{session.division_id}</span>
		{/if}
	</div>

	<!-- Gate output (notation / content from agent) -->
	{#if session.gate_output}
		<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto">
			<pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed">{session.gate_output}</pre>
		</div>
	{:else if session.output}
		<div class="rounded bg-surface-800 border border-surface-600 p-3 max-h-64 overflow-y-auto">
			<pre class="text-[10px] text-surface-200 whitespace-pre-wrap font-mono leading-relaxed">{session.output}</pre>
		</div>
	{/if}

	<!-- Token usage -->
	<div class="flex items-center gap-4 text-[9px] text-surface-400">
		<span>Tokens: {session.tokens_in.toLocaleString()} in / {session.tokens_out.toLocaleString()} out</span>
		{#if session.started_at}
			<span>Started: {new Date(session.started_at).toLocaleTimeString()}</span>
		{/if}
	</div>

	<!-- Actions -->
	{#if showRejectForm}
		<div class="space-y-2">
			<textarea
				bind:value={rejectReason}
				placeholder="Reason for rejecting..."
				rows="2"
				class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
					text-xs text-surface-100 placeholder-surface-400
					focus:outline-none focus:border-health-err/50 resize-none"
			></textarea>
			<div class="flex gap-2">
				<button
					onclick={handleReject}
					disabled={!rejectReason.trim()}
					class="px-3 py-1.5 rounded text-xs transition-colors
						{rejectReason.trim()
						? 'bg-health-err/20 text-health-err hover:bg-health-err/30'
						: 'bg-surface-700 text-surface-500 cursor-not-allowed'}"
				>
					Confirm Reject
				</button>
				<button
					onclick={() => (showRejectForm = false)}
					class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100"
				>
					Cancel
				</button>
			</div>
		</div>
	{:else}
		<div class="flex gap-2">
			<button
				onclick={onPass}
				class="px-4 py-1.5 rounded text-xs font-medium
					bg-health-ok/20 text-health-ok hover:bg-health-ok/30 transition-colors"
			>
				{'\u{2713}'} Pass Gate
			</button>
			<button
				onclick={() => (showRejectForm = true)}
				class="px-4 py-1.5 rounded text-xs font-medium
					bg-health-err/20 text-health-err hover:bg-health-err/30 transition-colors"
			>
				{'\u{2715}'} Reject Gate
			</button>
		</div>
	{/if}
</div>
