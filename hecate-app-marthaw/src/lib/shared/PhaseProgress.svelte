<script lang="ts">
	import { selectedDivision } from '$lib/guide_venture/guide_venture.js';
	import { selectedPhase, openPhase, shelvePhase, resumePhase, concludePhase, isLoading } from '$lib/shared/phaseStore.js';
	import { PHASES, openAIAssist } from '$lib/shared/aiStore.js';
	import {
		phaseStatus,
		hasFlag,
		PHASE_OPEN,
		PHASE_CONCLUDED,
		PHASE_SHELVED,
		PHASE_INITIATED,
		type PhaseCode
	} from '$lib/types.js';

	let currentPhaseStatus = $derived(
		$selectedDivision ? phaseStatus($selectedDivision, $selectedPhase) : 0
	);

	function setPhase(code: PhaseCode) {
		selectedPhase.set(code);
	}

	function phaseColor(code: PhaseCode, isActive: boolean): string {
		if (!isActive) return '';
		switch (code) {
			case 'planning':
				return 'border-phase-planning text-phase-planning';
			case 'crafting':
				return 'border-phase-crafting text-phase-crafting';
		}
	}

	async function handlePhaseAction(action: string) {
		if (!$selectedDivision) return;
		const divId = $selectedDivision.division_id;
		const phase = $selectedPhase;

		switch (action) {
			case 'open':
				await openPhase(divId, phase);
				break;
			case 'shelve':
				await shelvePhase(divId, phase);
				break;
			case 'resume':
				await resumePhase(divId, phase);
				break;
			case 'conclude':
				await concludePhase(divId, phase);
				break;
		}
	}
</script>

{#if $selectedDivision}
	<div class="border-b border-surface-600 bg-surface-800/30 px-4 py-2 shrink-0">
		<div class="flex items-center gap-1">
			<!-- Phase tabs -->
			{#each PHASES as phase, i}
				{@const ps = phaseStatus($selectedDivision, phase.code)}
				{@const isActive = $selectedPhase === phase.code}
				{@const isConcluded = hasFlag(ps, PHASE_CONCLUDED)}

				{#if i > 0}
					<div
						class="w-4 h-px {isConcluded ? 'bg-health-ok/40' : 'bg-surface-600'}"
					></div>
				{/if}

				<button
					onclick={() => setPhase(phase.code)}
					class="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all
						border
						{isActive
						? `bg-surface-700 border-current ${phaseColor(phase.code, true)}`
						: 'border-transparent text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'}"
				>
					{#if isConcluded}
						<span class="text-health-ok text-[10px]">{'\u{2713}'}</span>
					{:else if hasFlag(ps, PHASE_OPEN)}
						<span class="text-hecate-400 text-[10px] animate-pulse"
							>{'\u{25CF}'}</span
						>
					{:else if hasFlag(ps, PHASE_SHELVED)}
						<span class="text-health-warn text-[10px]">{'\u{25D0}'}</span>
					{:else if hasFlag(ps, PHASE_INITIATED)}
						<span class="text-surface-300 text-[10px]">{'\u{25CB}'}</span>
					{:else}
						<span class="text-surface-500 text-[10px]">{'\u{25CB}'}</span>
					{/if}
					<span>{phase.shortName}</span>
				</button>
			{/each}

			<div class="flex-1"></div>

			<!-- Phase info -->
			<span class="text-[10px] text-surface-400 mr-2">
				{PHASES.find((p) => p.code === $selectedPhase)?.name}
			</span>

			<!-- Phase lifecycle buttons -->
			{#if hasFlag(currentPhaseStatus, PHASE_INITIATED) && !hasFlag(currentPhaseStatus, PHASE_OPEN) && !hasFlag(currentPhaseStatus, PHASE_CONCLUDED) && !hasFlag(currentPhaseStatus, PHASE_SHELVED)}
				<button
					onclick={() => handlePhaseAction('open')}
					disabled={$isLoading}
					class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/20 text-hecate-300
						hover:bg-hecate-600/30 transition-colors disabled:opacity-50"
				>
					Open
				</button>
			{:else if !hasFlag(currentPhaseStatus, PHASE_INITIATED) && !hasFlag(currentPhaseStatus, PHASE_OPEN) && !hasFlag(currentPhaseStatus, PHASE_CONCLUDED)}
				<!-- Not yet initiated — pending -->
				<span class="text-[10px] text-surface-500 mr-1">Pending</span>
			{:else if hasFlag(currentPhaseStatus, PHASE_OPEN)}
				<button
					onclick={() => handlePhaseAction('shelve')}
					disabled={$isLoading}
					class="text-[10px] px-2 py-0.5 rounded text-surface-400
						hover:text-health-warn hover:bg-surface-700 transition-colors disabled:opacity-50"
				>
					Shelve
				</button>
				<button
					onclick={() => handlePhaseAction('conclude')}
					disabled={$isLoading}
					class="text-[10px] px-2 py-0.5 rounded text-surface-400
						hover:text-health-ok hover:bg-surface-700 transition-colors disabled:opacity-50"
				>
					Conclude
				</button>
			{:else if hasFlag(currentPhaseStatus, PHASE_SHELVED)}
				<button
					onclick={() => handlePhaseAction('resume')}
					disabled={$isLoading}
					class="text-[10px] px-2 py-0.5 rounded bg-health-warn/10 text-health-warn
						hover:bg-health-warn/20 transition-colors disabled:opacity-50"
				>
					Resume
				</button>
			{/if}

			<!-- AI Assist toggle -->
			<button
				onclick={() =>
					openAIAssist(
						`Help with ${PHASES.find((p) => p.code === $selectedPhase)?.name} phase for division "${$selectedDivision?.context_name}"`
					)}
				class="text-[10px] px-2 py-0.5 rounded text-hecate-400
					hover:bg-hecate-600/20 transition-colors ml-1"
				title="Open AI Assistant"
			>
				{'\u{2726}'} AI Assist
			</button>
		</div>
	</div>
{/if}
