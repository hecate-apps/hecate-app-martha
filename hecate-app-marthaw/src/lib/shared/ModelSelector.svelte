<script lang="ts">
	import { availableModels, modelAffinity } from './aiStore.js';

	interface Props {
		currentModel: string | null;
		onSelect: (name: string) => void;
		showPhaseInfo?: boolean;
		phasePreference?: string | null;
		phaseAffinity?: 'code' | 'general';
		onPinModel?: (name: string) => void;
		onClearPin?: () => void;
		phaseName?: string;
	}

	let {
		currentModel,
		onSelect,
		showPhaseInfo = false,
		phasePreference = null,
		phaseAffinity = 'general',
		onPinModel,
		onClearPin,
		phaseName = ''
	}: Props = $props();

	let isOpen = $state(false);
	let searchQuery = $state('');
	let dropdownEl: HTMLDivElement | undefined = $state();
	let searchEl: HTMLInputElement | undefined = $state();
	let expandedProviders = $state(new Set<string>());

	const PROVIDER_ORDER = ['Anthropic', 'OpenAI', 'Google', 'Groq', 'Meta', 'Ollama', 'Alibaba', 'Other'];

	// Top recommended model per provider (first in list = highest priority)
	const RECOMMENDED: Record<string, RegExp> = {
		Anthropic: /^claude-sonnet/,
		OpenAI: /^gpt-4o$/,
		Google: /^gemini-2\.5-flash$/,
		Groq: /^llama-3\.3/,
		Ollama: /./
	};

	type ModelGroup = { provider: string; models: string[]; recommended: string | null };

	let groupedModels = $derived.by(() => {
		const models = $availableModels;
		const q = searchQuery.toLowerCase();
		const filtered = q ? models.filter((m) => m.toLowerCase().includes(q)) : models;

		const groups = new Map<string, string[]>();
		for (const name of filtered) {
			const provider = guessProvider(name);
			const list = groups.get(provider) ?? [];
			list.push(name);
			groups.set(provider, list);
		}

		// Sort by defined order, then alphabetical for unknowns
		const result: ModelGroup[] = [];
		const ordered = [...groups.keys()].sort((a, b) => {
			const ai = PROVIDER_ORDER.indexOf(a);
			const bi = PROVIDER_ORDER.indexOf(b);
			const aIdx = ai === -1 ? 999 : ai;
			const bIdx = bi === -1 ? 999 : bi;
			return aIdx - bIdx || a.localeCompare(b);
		});

		for (const provider of ordered) {
			const list = groups.get(provider) ?? [];
			const pattern = RECOMMENDED[provider];
			const rec = pattern ? list.find((m) => pattern.test(m)) ?? null : null;
			result.push({ provider, models: list, recommended: rec });
		}
		return result;
	});

	// Flat list of recommended models (shown at top)
	let recommended = $derived(
		groupedModels
			.filter((g) => g.recommended !== null)
			.map((g) => ({ provider: g.provider, model: g.recommended! }))
	);

	// Total model count for display
	let totalCount = $derived(groupedModels.reduce((sum, g) => sum + g.models.length, 0));

	function guessProvider(name: string): string {
		if (name.startsWith('claude') || name.startsWith('anthropic')) return 'Anthropic';
		if (name.startsWith('gemini')) return 'Google';
		if (name.startsWith('llama') || name.startsWith('meta-llama')) return 'Meta';
		if (name.startsWith('qwen')) return 'Alibaba';
		if (name.startsWith('groq/')) return 'Groq';
		if (name.startsWith('openai/') || name.startsWith('gpt') || name.startsWith('o1') || name.startsWith('o3') || name.startsWith('o4')) return 'OpenAI';
		if (name.startsWith('allam')) return 'Groq';
		if (name.startsWith('moonshotai/')) return 'Groq';
		if (name.includes('/')) return name.split('/')[0];
		return 'Ollama';
	}

	function handleSelect(name: string) {
		onSelect(name);
		isOpen = false;
		searchQuery = '';
		expandedProviders = new Set();
	}

	function toggleProvider(provider: string) {
		const next = new Set(expandedProviders);
		if (next.has(provider)) {
			next.delete(provider);
		} else {
			next.add(provider);
		}
		expandedProviders = next;
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
			isOpen = false;
			searchQuery = '';
			expandedProviders = new Set();
		}
	}

	function shortName(name: string): string {
		if (name.length <= 24) return name;
		return name.slice(0, 22) + '\u2026';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isOpen = false;
			searchQuery = '';
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside, true);
			// Focus search on open
			requestAnimationFrame(() => searchEl?.focus());
		} else {
			document.removeEventListener('click', handleClickOutside, true);
		}
		return () => document.removeEventListener('click', handleClickOutside, true);
	});
</script>

<div class="relative" bind:this={dropdownEl}>
	<!-- Trigger button -->
	<button
		onclick={() => (isOpen = !isOpen)}
		class="text-[10px] px-2 py-0.5 rounded bg-surface-700 text-surface-300
			hover:bg-surface-600 transition-colors truncate max-w-[200px] flex items-center gap-1"
		title={currentModel ?? 'No model selected'}
	>
		{#if currentModel}
			<span class="truncate">{shortName(currentModel)}</span>
			{#if modelAffinity(currentModel) === 'code'}
				<span class="text-[8px] text-hecate-400">{'\u{2022}'}</span>
			{/if}
		{:else}
			<span class="text-surface-500">Select model</span>
		{/if}
		<span class="text-[8px] ml-0.5">{isOpen ? '\u{25B2}' : '\u{25BC}'}</span>
	</button>

	<!-- Dropdown -->
	{#if isOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onkeydown={handleKeydown}
			class="absolute top-full left-0 mt-1 w-80 max-h-[420px] overflow-hidden
				bg-surface-800 border border-surface-600 rounded-lg shadow-xl z-50
				flex flex-col"
		>
			<!-- Search input -->
			<div class="p-2 border-b border-surface-700">
				<input
					bind:this={searchEl}
					bind:value={searchQuery}
					placeholder="Search {totalCount} models..."
					class="w-full bg-surface-700 border border-surface-600 rounded px-2 py-1
						text-[11px] text-surface-100 placeholder-surface-500
						focus:outline-none focus:border-hecate-500"
				/>
			</div>

			<!-- Phase info -->
			{#if showPhaseInfo && phaseName}
				<div class="px-2 py-1.5 border-b border-surface-700 flex items-center justify-between">
					<span class="text-[9px] text-surface-400">
						Phase: <span class="text-surface-200">{phaseName}</span>
						{#if phaseAffinity === 'code'}
							<span class="text-hecate-400 ml-1">(code-optimized)</span>
						{/if}
					</span>
					{#if phasePreference}
						<button
							onclick={() => onClearPin?.()}
							class="text-[9px] text-surface-500 hover:text-surface-300"
							title="Clear pinned model for this phase"
						>
							Unpin
						</button>
					{/if}
				</div>
			{/if}

			<!-- Model list -->
			<div class="overflow-y-auto flex-1">
				{#if groupedModels.length === 0}
					<div class="p-3 text-center text-[11px] text-surface-500">
						{$availableModels.length === 0 ? 'No models available' : 'No matching models'}
					</div>
				{/if}

				<!-- Recommended section (always visible when not searching) -->
				{#if !searchQuery && recommended.length > 0}
					<div class="py-1 border-b border-surface-700">
						<div class="px-2 py-1 text-[9px] text-hecate-400 uppercase tracking-wider font-medium">
							Recommended
						</div>
						{#each recommended as { provider, model }}
							{@const isSelected = model === currentModel}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								onclick={() => handleSelect(model)}
								class="w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
									transition-colors cursor-pointer
									{isSelected
									? 'bg-hecate-600/20 text-hecate-300'
									: 'text-surface-200 hover:bg-surface-700'}"
							>
								<span class="truncate flex-1">{model}</span>
								<span class="text-[9px] text-surface-500 shrink-0">{provider}</span>
								{#if isSelected}
									<span class="text-[9px] text-hecate-400 shrink-0">{'\u{2713}'}</span>
								{/if}
							</div>
						{/each}
					</div>
				{/if}

				<!-- Provider groups -->
				{#each groupedModels as group}
					{@const isExpanded = searchQuery !== '' || expandedProviders.has(group.provider)}
					<div class="py-0.5">
						<!-- Provider header (clickable to expand/collapse) -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							onclick={() => !searchQuery && toggleProvider(group.provider)}
							class="px-2 py-1 text-[9px] uppercase tracking-wider font-medium flex items-center gap-1
								{searchQuery ? 'text-surface-500' : 'text-surface-500 hover:text-surface-300 cursor-pointer'}"
						>
							{#if !searchQuery}
								<span class="text-[8px] w-3 text-center">{isExpanded ? '\u{25BC}' : '\u{25B6}'}</span>
							{/if}
							<span>{group.provider}</span>
							<span class="text-surface-600 font-normal">({group.models.length})</span>
						</div>

						<!-- Models (visible when expanded or searching) -->
						{#if isExpanded}
							{#each group.models as name}
								{@const isSelected = name === currentModel}
								{@const isPinned = name === phasePreference}
								{@const isRec = name === group.recommended && !searchQuery}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									onclick={() => handleSelect(name)}
									class="w-full text-left px-2 py-1.5 text-[11px] flex items-center gap-1.5
										transition-colors cursor-pointer
										{searchQuery ? 'pl-2' : 'pl-6'}
										{isSelected
										? 'bg-hecate-600/20 text-hecate-300'
										: 'text-surface-200 hover:bg-surface-700'}"
								>
									<span class="truncate flex-1">{name}</span>
									{#if isRec}
										<span class="text-[8px] text-hecate-500 shrink-0">{'\u{2605}'}</span>
									{/if}
									{#if modelAffinity(name) === 'code'}
										<span class="text-[8px] text-hecate-400 shrink-0" title="Code model">{'\u{2022}'} code</span>
									{/if}
									{#if isPinned}
										<span class="text-[8px] text-hecate-400 shrink-0" title="Pinned for this phase">{'\u{1F4CC}'}</span>
									{/if}
									{#if isSelected}
										<span class="text-[9px] text-hecate-400 shrink-0">{'\u{2713}'}</span>
									{/if}
									{#if showPhaseInfo && onPinModel && !isPinned}
										<button
											onclick={(e: MouseEvent) => { e.stopPropagation(); onPinModel?.(name); }}
											class="text-[8px] text-surface-600 hover:text-hecate-400 shrink-0"
											title="Pin for {phaseName} phase"
										>
											pin
										</button>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
