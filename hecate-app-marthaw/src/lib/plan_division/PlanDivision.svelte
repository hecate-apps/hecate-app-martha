<script lang="ts">
	import { selectedDivision, isLoading } from '$lib/guide_venture/guide_venture.js';
	import {
		deskCards,
		deskCardsByAggregate,
		deskAggregates,
		addDeskCard,
		removeDeskCard,
		setDeskExecution,
		addPolicyToDesk,
		removePolicyFromDesk,
		addEventToDesk,
		removeEventFromDesk,
		updateDeskCard,
		designAggregate,
		designEvent,
		planDesk
	} from '$lib/plan_division/plan_division.js';
	import type { DeskCard, ExecutionMode } from '$lib/plan_division/plan_division.js';
	import { openAIAssist } from '$lib/shared/aiStore.js';
	import { designLevelAgents, type AgentPrompt } from '$lib/shared/agentsStore.js';
	import TaskCard from '$lib/shared/TaskCard.svelte';

	// --- Design tab: desk card form ---
	let deskName = $state('');
	let deskAggregate = $state('');
	let deskExecution = $state<ExecutionMode>('human');

	// Per-card inline inputs (keyed by card id)
	let policyInputs: Record<string, string> = $state({});
	let eventInputs: Record<string, string> = $state({});

	// Editing state
	let editingCard = $state<string | null>(null);
	let editName = $state('');

	// --- Plan tab: desk inventory form ---
	let showDeskForm = $state(false);
	let planDeskName = $state('');
	let planDeskDesc = $state('');
	let planDeskDept = $state('cmd');

	// --- Tab ---
	let activeTab = $state<'design' | 'plan'>('design');

	function handleAddDesk() {
		if (!deskName.trim()) return;
		addDeskCard(deskName, deskAggregate || undefined, deskExecution);
		deskName = '';
		deskAggregate = '';
		deskExecution = 'human';
	}

	function handleDeskKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && deskName.trim()) {
			e.preventDefault();
			handleAddDesk();
		}
	}

	function handlePolicyKeydown(e: KeyboardEvent, cardId: string) {
		if (e.key === 'Enter' && policyInputs[cardId]?.trim()) {
			e.preventDefault();
			addPolicyToDesk(cardId, policyInputs[cardId]);
			policyInputs[cardId] = '';
		}
	}

	function handleEventKeydown(e: KeyboardEvent, cardId: string) {
		if (e.key === 'Enter' && eventInputs[cardId]?.trim()) {
			e.preventDefault();
			addEventToDesk(cardId, eventInputs[cardId]);
			eventInputs[cardId] = '';
		}
	}

	function startEdit(card: DeskCard) {
		editingCard = card.id;
		editName = card.name;
	}

	function finishEdit(cardId: string) {
		if (editName.trim()) {
			updateDeskCard(cardId, { name: editName.trim() });
		}
		editingCard = null;
	}

	function cycleExecution(card: DeskCard) {
		const modes: ExecutionMode[] = ['human', 'agent', 'both'];
		const idx = modes.indexOf(card.execution);
		setDeskExecution(card.id, modes[(idx + 1) % modes.length]);
	}

	function executionIcon(mode: ExecutionMode): string {
		switch (mode) {
			case 'human':
				return '\u{1D5E8}';
			case 'agent':
				return '\u{2699}';
			case 'both':
			case 'pair':
				return '\u{2726}';
		}
	}

	function executionLabel(mode: ExecutionMode): string {
		switch (mode) {
			case 'human':
				return 'Interactive (human)';
			case 'agent':
				return 'Automated (AI agent)';
			case 'both':
			case 'pair':
				return 'Assisted (human + AI)';
		}
	}

	function executionColor(mode: ExecutionMode): string {
		switch (mode) {
			case 'human':
				return 'text-es-command';
			case 'agent':
				return 'text-hecate-400';
			case 'both':
			case 'pair':
				return 'text-phase-crafting';
		}
	}

	// Promote desk card to daemon artifacts
	async function promoteDesk(card: DeskCard) {
		if (!$selectedDivision) return;
		const divId = $selectedDivision.division_id;

		await planDesk(divId, {
			desk_name: card.name,
			description: [
				card.execution === 'agent' ? 'AI-automated' : card.execution === 'both' ? 'Human+AI assisted' : 'Interactive',
				card.policies.length > 0 ? `Policies: ${card.policies.map((p) => p.text).join(', ')}` : '',
				card.events.length > 0 ? `Emits: ${card.events.map((e) => e.text).join(', ')}` : ''
			].filter(Boolean).join('. '),
			department: 'CMD'
		});

		for (const evt of card.events) {
			await designEvent(divId, {
				event_name: evt.text,
				aggregate_type: card.aggregate || card.name
			});
		}

		if (card.aggregate) {
			await designAggregate(divId, { aggregate_name: card.aggregate });
		}
	}

	async function handlePlanDesk() {
		if (!$selectedDivision || !planDeskName.trim()) return;
		const ok = await planDesk($selectedDivision.division_id, {
			desk_name: planDeskName.trim(),
			description: planDeskDesc.trim() || undefined,
			department: planDeskDept
		});
		if (ok) {
			planDeskName = '';
			planDeskDesc = '';
			showDeskForm = false;
		}
	}

	function agentContextPrompt(persona: AgentPrompt): string {
		const div = $selectedDivision?.context_name ?? 'this division';
		const cards = $deskCards;
		const existingDesks = cards.map((c) => c.name).join(', ');
		const existingEvents = cards
			.flatMap((c) => c.events.map((e) => e.text))
			.join(', ');
		const existingPolicies = cards
			.flatMap((c) => c.policies.map((p) => p.text))
			.join(', ');

		let context = `We are doing Design-Level Event Storming for the "${div}" division.\n\n`;
		context += 'Our board uses command-centric desk cards:\n';
		context += '- Each card = a desk (command/slice)\n';
		context += '- Left side: policies (grey) = filter/guard conditions\n';
		context += '- Right side: events (orange) = what the desk emits\n';
		context += '- Cards can be human (interactive), agent (AI), or both\n\n';

		if (existingDesks) context += `Desks so far: ${existingDesks}\n`;
		if (existingEvents) context += `Events so far: ${existingEvents}\n`;
		if (existingPolicies) context += `Policies so far: ${existingPolicies}\n`;
		context += `\n${persona.prompt}\n\nPlease analyze and suggest items for the board.`;
		return context;
	}
</script>

<div class="p-4 space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h3 class="text-sm font-semibold text-surface-100">
				Planning
			</h3>
			<p class="text-[11px] text-surface-400 mt-0.5">
				Design aggregates, plan desks, and map dependencies for
				<span class="text-surface-200">{$selectedDivision?.context_name}</span>
			</p>
		</div>

		<!-- Tab switcher -->
		<div class="flex items-center gap-1 bg-surface-700/50 rounded-lg p-0.5">
			<button
				onclick={() => (activeTab = 'design')}
				class="px-3 py-1 rounded text-[11px] transition-colors
					{activeTab === 'design'
					? 'bg-surface-600 text-surface-100'
					: 'text-surface-400 hover:text-surface-200'}"
			>
				Event Storm
			</button>
			<button
				onclick={() => (activeTab = 'plan')}
				class="px-3 py-1 rounded text-[11px] transition-colors
					{activeTab === 'plan'
					? 'bg-surface-600 text-surface-100'
					: 'text-surface-400 hover:text-surface-200'}"
			>
				Desk Inventory
			</button>
		</div>
	</div>

	{#if activeTab === 'design'}
		<!-- ========== DESIGN TAB: Event Storming Board ========== -->

		<!-- Add Desk Form -->
		<div class="rounded-lg border border-es-command/20 bg-es-command/5 p-3">
			<div class="flex items-end gap-2">
				<div class="flex-1">
					<label class="text-[9px] text-surface-400 block mb-1">
						Desk Name (command)
					</label>
					<input
						bind:value={deskName}
						onkeydown={handleDeskKeydown}
						placeholder="e.g., register_user, process_order"
						class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-es-command/50"
					/>
				</div>
				<div class="w-40">
					<label class="text-[9px] text-surface-400 block mb-1">
						Aggregate
					</label>
					<input
						bind:value={deskAggregate}
						placeholder="e.g., user, order"
						list="existing-aggregates"
						class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-surface-500"
					/>
					<datalist id="existing-aggregates">
						{#each $deskAggregates as agg}
							<option value={agg}></option>
						{/each}
					</datalist>
				</div>
				<div class="w-24">
					<label class="text-[9px] text-surface-400 block mb-1">
						Execution
					</label>
					<select
						bind:value={deskExecution}
						class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-surface-500"
					>
						<option value="human">Human</option>
						<option value="agent">Agent</option>
						<option value="both">Both</option>
					</select>
				</div>
				<button
					onclick={handleAddDesk}
					disabled={!deskName.trim()}
					class="px-3 py-1.5 rounded text-xs transition-colors shrink-0
						{deskName.trim()
						? 'bg-es-command/20 text-es-command hover:bg-es-command/30'
						: 'bg-surface-700 text-surface-500 cursor-not-allowed'}"
				>
					+ Desk
				</button>
			</div>
		</div>

		<!-- Desk Cards Board -->
		{#if $deskCards.length > 0}
			{@const { grouped, ungrouped } = $deskCardsByAggregate}

			{#each [...grouped.entries()] as [aggName, cards]}
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="w-3 h-3 rounded-sm bg-es-aggregate/40"></div>
						<span class="text-[10px] font-semibold text-es-aggregate uppercase tracking-wider">
							{aggName}
						</span>
						<div class="flex-1 h-px bg-es-aggregate/20"></div>
						<span class="text-[9px] text-surface-400">{cards.length} desk{cards.length !== 1 ? 's' : ''}</span>
					</div>

					<div class="space-y-3 ml-5">
						{#each cards as card (card.id)}
							{@render deskCardView(card)}
						{/each}
					</div>
				</div>
			{/each}

			{#if ungrouped.length > 0}
				{#if grouped.size > 0}
					<div class="flex items-center gap-2">
						<span class="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">
							No Aggregate
						</span>
						<div class="flex-1 h-px bg-surface-600"></div>
					</div>
				{/if}

				<div class="space-y-3 {grouped.size > 0 ? 'ml-5' : ''}">
					{#each ungrouped as card (card.id)}
						{@render deskCardView(card)}
					{/each}
				</div>
			{/if}
		{:else}
			<div class="text-center py-8 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg">
				No desk cards yet. Add your first command desk above,
				or ask an AI agent for suggestions.
			</div>
		{/if}

		<!-- AI Agent Team -->
		<div class="rounded-lg border border-hecate-600/20 bg-hecate-950/20 p-4">
			<div class="flex items-center gap-2 mb-3">
				<span class="text-hecate-400">{'\u{2726}'}</span>
				<h4 class="text-xs font-semibold text-surface-100">
					AI Domain Experts
				</h4>
				<span class="text-[10px] text-surface-400">
					Ask a virtual agent to analyze the domain and suggest desk cards
				</span>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-2">
				{#each $designLevelAgents as persona}
					<button
						onclick={() => openAIAssist(agentContextPrompt(persona))}
						class="rounded-lg border border-surface-600 bg-surface-800/50
							p-3 text-left transition-all hover:border-hecate-500/40
							hover:bg-surface-700/50 group"
					>
						<div class="flex items-center gap-2 mb-1.5">
							<span class="text-hecate-400 group-hover:text-hecate-300 transition-colors">
								{persona.icon}
							</span>
							<span class="text-[11px] font-semibold text-surface-100">
								{persona.name}
							</span>
						</div>
						<div class="text-[10px] text-surface-400 mb-1">
							{persona.role}
						</div>
						<div class="text-[9px] text-surface-500">
							{persona.description}
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Design Tasks -->
		<div>
			<h4 class="text-xs font-semibold text-surface-100 mb-3">Design Tasks</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				<TaskCard
					title="Design Aggregates"
					description="Identify aggregate boundaries, define stream patterns and status flags"
					icon={'\u{25A0}'}
					aiContext={`Help me design aggregates for the "${$selectedDivision?.context_name}" division. What are the natural consistency boundaries? What entities accumulate history over time?`}
				/>
				<TaskCard
					title="Define Status Flags"
					description="Design bit flag status fields for each aggregate lifecycle"
					icon={'\u{2691}'}
					aiContext={`Help me define status bit flags for aggregates in the "${$selectedDivision?.context_name}" division. Each aggregate needs lifecycle states as bit flags (powers of 2).`}
				/>
				<TaskCard
					title="Map Read Models"
					description="Identify what queries users will run and what data they need"
					icon={'\u{25B6}'}
					aiContext={`Help me identify read models for the "${$selectedDivision?.context_name}" division. What queries will users run? What data views are needed?`}
				/>
				<TaskCard
					title="Domain Glossary"
					description="Document ubiquitous language and bounded context definitions"
					icon={'\u{270E}'}
					aiContext={`Help me create a domain glossary for the "${$selectedDivision?.context_name}" division. Define key terms, bounded context boundaries, and ubiquitous language.`}
				/>
			</div>
		</div>

	{:else}
		<!-- ========== PLAN TAB: Desk Inventory & Dependencies ========== -->

		<!-- Plan a Desk -->
		<div class="rounded-lg border border-surface-600 bg-surface-800/50 p-4">
			<div class="flex items-center justify-between mb-3">
				<h4 class="text-xs font-semibold text-surface-100">Desk Inventory</h4>
				<button
					onclick={() => (showDeskForm = !showDeskForm)}
					class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/10 text-hecate-300
						hover:bg-hecate-600/20 transition-colors"
				>
					+ Plan Desk
				</button>
			</div>

			{#if showDeskForm}
				<div class="flex gap-2 items-end mb-4 p-3 rounded bg-surface-700/30">
					<div class="flex-1">
						<label for="desk-name" class="text-[10px] text-surface-400 block mb-1"
							>Desk Name</label
						>
						<input
							id="desk-name"
							bind:value={planDeskName}
							placeholder="e.g., register_user"
							class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"
						/>
					</div>
					<div class="flex-1">
						<label for="desk-desc" class="text-[10px] text-surface-400 block mb-1"
							>Description</label
						>
						<input
							id="desk-desc"
							bind:value={planDeskDesc}
							placeholder="Brief purpose of this desk"
							class="w-full bg-surface-700 border border-surface-600 rounded
								px-2.5 py-1.5 text-xs text-surface-100 placeholder-surface-400
								focus:outline-none focus:border-hecate-500/50"
						/>
					</div>
					<div>
						<label for="desk-dept" class="text-[10px] text-surface-400 block mb-1"
							>Dept</label
						>
						<select
							id="desk-dept"
							bind:value={planDeskDept}
							class="bg-surface-700 border border-surface-600 rounded
								px-2 py-1.5 text-xs text-surface-100
								focus:outline-none focus:border-hecate-500/50 cursor-pointer"
						>
							<option value="cmd">CMD</option>
							<option value="qry">QRY</option>
							<option value="prj">PRJ</option>
						</select>
					</div>
					<button
						onclick={handlePlanDesk}
						disabled={!planDeskName.trim() || $isLoading}
						class="px-3 py-1.5 rounded text-xs bg-hecate-600/20 text-hecate-300
							hover:bg-hecate-600/30 transition-colors disabled:opacity-50"
					>
						Plan
					</button>
					<button
						onclick={() => (showDeskForm = false)}
						class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100"
					>
						Cancel
					</button>
				</div>
			{/if}

			<p class="text-[10px] text-surface-400">
				Desks are individual capabilities within a department. Each desk owns a
				vertical slice: command + event + handler + projection.
			</p>
		</div>

		<!-- Planning Tasks -->
		<div>
			<h4 class="text-xs font-semibold text-surface-100 mb-3">Planning Tasks</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				<TaskCard
					title="Desk Inventory"
					description="Create a complete inventory of desks needed for this division, organized by department (CMD, QRY, PRJ)"
					icon={'\u{25A3}'}
					aiContext={`Help me create a desk inventory for the "${$selectedDivision?.context_name}" division. Each desk is a vertical slice (command + event + handler). Organize by CMD (write), QRY (read), and PRJ (projection) departments.`}
				/>
				<TaskCard
					title="Dependency Mapping"
					description="Map dependencies between desks to determine implementation order"
					icon={'\u{21C4}'}
					aiContext={`Help me map dependencies between desks in the "${$selectedDivision?.context_name}" division. Which desks depend on which? What's the optimal implementation order?`}
				/>
				<TaskCard
					title="Sprint Sequencing"
					description="Prioritize and sequence desks into implementation sprints"
					icon={'\u{2630}'}
					aiContext={`Help me sequence the implementation of desks in the "${$selectedDivision?.context_name}" division into logical sprints. Consider dependencies, walking skeleton principles, and the "initiate + archive" first rule.`}
				/>
				<TaskCard
					title="API Design"
					description="Design REST API endpoints for each desk's capabilities"
					icon={'\u{2194}'}
					aiContext={`Help me design REST API endpoints for the "${$selectedDivision?.context_name}" division. Follow the pattern: POST /api/{resource}/{action} for commands, GET /api/{resource} for queries.`}
				/>
			</div>
		</div>
	{/if}
</div>

<!-- Desk Card Snippet -->
{#snippet deskCardView(card: DeskCard)}
	<div class="flex items-stretch gap-0 group/card">
		<!-- POLICIES (left, grey, smaller, overlapping right) -->
		<div class="flex flex-col items-end gap-1 -mr-2 z-10 pt-1 min-w-[100px]">
			{#each card.policies as policy (policy.id)}
				<div
					class="group/policy flex items-center gap-1 px-2 py-1 rounded-l rounded-r-sm
						bg-es-policy/15 border border-es-policy/30 text-[9px] text-surface-200
						max-w-[160px]"
				>
					<span class="truncate flex-1">{policy.text}</span>
					<button
						onclick={() => removePolicyFromDesk(card.id, policy.id)}
						class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/policy:opacity-100 transition-opacity shrink-0"
					>
						{'\u{2715}'}
					</button>
				</div>
			{/each}

			<input
				bind:value={policyInputs[card.id]}
				onkeydown={(e) => handlePolicyKeydown(e, card.id)}
				placeholder="+ policy"
				class="w-24 bg-transparent border border-dashed border-es-policy/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-policy/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"
			/>
		</div>

		<!-- COMMAND CARD (center, blue, large) -->
		<div
			class="relative flex-1 rounded-lg border-2 border-es-command/40 bg-es-command/10
				px-4 py-3 min-h-[72px] z-20"
		>
			<div class="flex items-center gap-2 mb-1">
				<button
					onclick={() => cycleExecution(card)}
					class="text-sm {executionColor(card.execution)}
						hover:scale-110 transition-transform"
					title="{executionLabel(card.execution)} — click to cycle"
				>
					{executionIcon(card.execution)}
				</button>

				{#if editingCard === card.id}
					<input
						bind:value={editName}
						onkeydown={(e) => {
							if (e.key === 'Enter') finishEdit(card.id);
							if (e.key === 'Escape') editingCard = null;
						}}
						onblur={() => finishEdit(card.id)}
						class="flex-1 bg-surface-700 border border-es-command/30 rounded px-2 py-0.5
							text-xs font-semibold text-surface-100
							focus:outline-none focus:border-es-command"
					/>
				{:else}
					<button
						ondblclick={() => startEdit(card)}
						class="flex-1 text-left text-xs font-semibold text-surface-100
							hover:text-es-command transition-colors"
						title="Double-click to rename"
					>
						{card.name}
					</button>
				{/if}

				<div class="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
					<button
						onclick={() => promoteDesk(card)}
						class="text-[8px] px-1.5 py-0.5 rounded text-health-ok
							hover:bg-health-ok/10 transition-colors"
						title="Promote to daemon"
					>
						{'\u{2191}'} promote
					</button>
					<button
						onclick={() => removeDeskCard(card.id)}
						class="text-[8px] px-1 py-0.5 rounded text-surface-500
							hover:text-health-err hover:bg-health-err/10 transition-colors"
						title="Remove desk"
					>
						{'\u{2715}'}
					</button>
				</div>
			</div>

			{#if card.aggregate}
				<span class="text-[9px] text-es-aggregate/70">
					{'\u{25A0}'} {card.aggregate}
				</span>
			{/if}
		</div>

		<!-- EVENTS (right, orange, smaller, overlapping left) -->
		<div class="flex flex-col items-start gap-1 -ml-2 z-10 pt-1 min-w-[100px]">
			{#each card.events as evt (evt.id)}
				<div
					class="group/event flex items-center gap-1 px-2 py-1 rounded-r rounded-l-sm
						bg-es-event/15 border border-es-event/30 text-[9px] text-surface-200
						max-w-[200px]"
				>
					<span class="truncate flex-1">{evt.text}</span>
					<button
						onclick={() => removeEventFromDesk(card.id, evt.id)}
						class="text-[7px] text-surface-500 hover:text-health-err
							opacity-0 group-hover/event:opacity-100 transition-opacity shrink-0"
					>
						{'\u{2715}'}
					</button>
				</div>
			{/each}

			<input
				bind:value={eventInputs[card.id]}
				onkeydown={(e) => handleEventKeydown(e, card.id)}
				placeholder="+ event"
				class="w-32 bg-transparent border border-dashed border-es-event/20 rounded
					px-1.5 py-0.5 text-[8px] text-surface-400 placeholder-surface-500
					focus:outline-none focus:border-es-event/40
					opacity-0 group-hover/card:opacity-100 transition-opacity"
			/>
		</div>
	</div>
{/snippet}
