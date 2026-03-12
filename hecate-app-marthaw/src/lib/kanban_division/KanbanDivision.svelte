<script lang="ts">
	import { selectedDivision } from '$lib/guide_venture/guide_venture.js';
	import {
		kanbanCards,
		kanbanBoard,
		kanbanError,
		kanbanLoading,
		postedCards,
		pickedCards,
		finishedCards,
		parkedCards,
		blockedCards,
		cardCounts,
		fetchKanban,
		postCard,
		pickCard,
		finishCard,
		unpickCard,
		parkCard,
		unparkCard,
		blockCard,
		unblockCard
	} from '$lib/kanban_division/kanban_division.js';
	import type { KanbanCard } from '$lib/kanban_division/kanban_division.js';

	// Fetch kanban when division changes
	let lastDivId = $state<string | null>(null);
	$effect(() => {
		const div = $selectedDivision;
		if (div && div.division_id !== lastDivId) {
			lastDivId = div.division_id;
			fetchKanban(div.division_id);
		}
	});

	// --- Post form state ---
	let showPostForm = $state(false);
	let cardTitle = $state('');
	let cardDesc = $state('');
	let cardType = $state<'cmd_desk' | 'prj_desk' | 'qry_desk'>('cmd_desk');

	// --- Modal state (shared for unpick, park, block) ---
	type ModalAction = 'unpick' | 'park' | 'block';
	let modalCard = $state<KanbanCard | null>(null);
	let modalAction = $state<ModalAction>('unpick');
	let modalReason = $state('');

	async function handlePost() {
		if (!$selectedDivision || !cardTitle.trim()) return;
		const ok = await postCard($selectedDivision.division_id, {
			title: cardTitle.trim(),
			description: cardDesc.trim() || undefined,
			card_type: cardType,
			posted_by: 'hecate-web'
		});
		if (ok) {
			cardTitle = '';
			cardDesc = '';
			showPostForm = false;
		}
	}

	async function handlePick(card: KanbanCard) {
		if (!$selectedDivision) return;
		await pickCard($selectedDivision.division_id, card.card_id);
	}

	async function handleFinish(card: KanbanCard) {
		if (!$selectedDivision) return;
		await finishCard($selectedDivision.division_id, card.card_id);
	}

	function openModal(card: KanbanCard, action: ModalAction) {
		modalCard = card;
		modalAction = action;
		modalReason = '';
	}

	async function handleModalSubmit() {
		if (!$selectedDivision || !modalCard || !modalReason.trim()) return;
		const divId = $selectedDivision.division_id;
		const cId = modalCard.card_id;
		let ok = false;
		if (modalAction === 'unpick') {
			ok = await unpickCard(divId, cId, modalReason.trim());
		} else if (modalAction === 'park') {
			ok = await parkCard(divId, cId, modalReason.trim());
		} else if (modalAction === 'block') {
			ok = await blockCard(divId, cId, modalReason.trim());
		}
		if (ok) {
			modalCard = null;
			modalReason = '';
		}
	}

	async function handleUnpark(card: KanbanCard) {
		if (!$selectedDivision) return;
		await unparkCard($selectedDivision.division_id, card.card_id);
	}

	async function handleUnblock(card: KanbanCard) {
		if (!$selectedDivision) return;
		await unblockCard($selectedDivision.division_id, card.card_id);
	}

	function cardTypeLabel(type: string): string {
		switch (type) {
			case 'cmd_desk': return 'CMD';
			case 'prj_desk': return 'PRJ';
			case 'qry_desk': return 'QRY';
			default: return type;
		}
	}

	function cardTypeColor(type: string): string {
		switch (type) {
			case 'cmd_desk': return 'bg-es-command/20 text-es-command';
			case 'prj_desk': return 'bg-phase-crafting/20 text-phase-crafting';
			case 'qry_desk': return 'bg-hecate-600/20 text-hecate-400';
			default: return 'bg-surface-600 text-surface-300';
		}
	}

	function formatTime(ts: number | null): string {
		if (!ts) return '';
		return new Date(ts).toLocaleDateString(undefined, {
			month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
		});
	}

	const modalLabels: Record<ModalAction, { title: string; verb: string; color: string }> = {
		unpick: { title: 'Unpick Card', verb: 'Unpick', color: 'health-warn' },
		park: { title: 'Park Card', verb: 'Park', color: 'health-warn' },
		block: { title: 'Block Card', verb: 'Block', color: 'health-err' }
	};
</script>

<div class="p-4 space-y-4">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h3 class="text-sm font-semibold text-surface-100">Kanban</h3>
			<p class="text-[11px] text-surface-400 mt-0.5">
				Work cards for
				<span class="text-surface-200">{$selectedDivision?.context_name}</span>
			</p>
		</div>

		<div class="flex items-center gap-2">
			{#if $kanbanCards.length > 0}
				<div class="flex items-center gap-3 text-[10px] text-surface-400 mr-2">
					<span>{$cardCounts.posted} posted</span>
					<span>{$cardCounts.picked} picked</span>
					<span>{$cardCounts.finished} done</span>
					{#if $cardCounts.parked > 0}
						<span class="text-health-warn">{$cardCounts.parked} parked</span>
					{/if}
					{#if $cardCounts.blocked > 0}
						<span class="text-health-err">{$cardCounts.blocked} blocked</span>
					{/if}
				</div>
			{/if}

			<button
				onclick={() => (showPostForm = !showPostForm)}
				class="text-[11px] px-3 py-1 rounded bg-hecate-600/20 text-hecate-300
					hover:bg-hecate-600/30 transition-colors"
			>
				+ Post Card
			</button>
		</div>
	</div>

	<!-- Error banner -->
	{#if $kanbanError}
		<div class="text-[11px] text-health-err bg-health-err/10 rounded px-3 py-2">
			{$kanbanError}
		</div>
	{/if}

	<!-- Post form -->
	{#if showPostForm}
		<div class="rounded-lg border border-hecate-600/30 bg-surface-800/80 p-4 space-y-3">
			<h4 class="text-xs font-medium text-hecate-300 uppercase tracking-wider">
				New Work Card
			</h4>
			<div class="grid grid-cols-[1fr_auto] gap-3">
				<div>
					<label for="card-title" class="text-[10px] text-surface-400 block mb-1">Title (desk name)</label>
					<input
						id="card-title"
						bind:value={cardTitle}
						placeholder="e.g., register_user"
						class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-hecate-500/50"
					/>
				</div>
				<div>
					<label for="card-type" class="text-[10px] text-surface-400 block mb-1">Department</label>
					<select
						id="card-type"
						bind:value={cardType}
						class="bg-surface-700 border border-surface-600 rounded px-2 py-1.5
							text-xs text-surface-100
							focus:outline-none focus:border-hecate-500/50 cursor-pointer"
					>
						<option value="cmd_desk">CMD</option>
						<option value="prj_desk">PRJ</option>
						<option value="qry_desk">QRY</option>
					</select>
				</div>
			</div>
			<div>
				<label for="card-desc" class="text-[10px] text-surface-400 block mb-1">Description (optional)</label>
				<input
					id="card-desc"
					bind:value={cardDesc}
					placeholder="Brief description of this desk"
					class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
						text-xs text-surface-100 placeholder-surface-400
						focus:outline-none focus:border-hecate-500/50"
				/>
			</div>
			<div class="flex gap-2">
				<button
					onclick={handlePost}
					disabled={!cardTitle.trim()}
					class="px-3 py-1.5 rounded text-xs transition-colors
						{cardTitle.trim()
						? 'bg-hecate-600/20 text-hecate-300 hover:bg-hecate-600/30'
						: 'bg-surface-700 text-surface-500 cursor-not-allowed'}"
				>
					Post
				</button>
				<button
					onclick={() => (showPostForm = false)}
					class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100"
				>
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<!-- Loading -->
	{#if $kanbanLoading}
		<div class="text-center py-8 text-surface-400 text-xs animate-pulse">
			Loading kanban board...
		</div>
	{:else if $kanbanCards.length === 0 && !showPostForm}
		<!-- Empty state -->
		<div class="text-center py-12 text-surface-500 text-xs border border-dashed border-surface-600 rounded-lg">
			<div class="text-2xl mb-3 text-surface-400">{'\u{2610}'}</div>
			<p class="mb-1">No work cards yet.</p>
			<p class="text-[10px] text-surface-500">
				Post cards from storming output, or add them manually above.
			</p>
		</div>
	{:else}
		<!-- Main 3-column kanban board -->
		<div class="grid grid-cols-3 gap-3 min-h-[300px]">
			<!-- POSTED column -->
			<div class="rounded-lg border border-surface-600 bg-surface-800/30">
				<div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-hecate-400"></span>
					<span class="text-[11px] font-semibold text-surface-200">Posted</span>
					<span class="text-[10px] text-surface-500 ml-auto">{$postedCards.length}</span>
				</div>
				<div class="p-2 space-y-2">
					{#each $postedCards as card (card.card_id)}
						<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group">
							<div class="flex items-start gap-2 mb-1.5">
								<span class="text-xs font-medium text-surface-100 flex-1 leading-tight">
									{card.title}
								</span>
								<span class="text-[9px] px-1.5 py-0.5 rounded {cardTypeColor(card.card_type)} shrink-0">
									{cardTypeLabel(card.card_type)}
								</span>
							</div>
							{#if card.description}
								<p class="text-[10px] text-surface-400 mb-2 leading-relaxed">{card.description}</p>
							{/if}
							<div class="flex items-center justify-between">
								<span class="text-[9px] text-surface-500">{formatTime(card.posted_at)}</span>
								<div class="flex items-center gap-1
									opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										onclick={() => handlePick(card)}
										class="text-[10px] px-2 py-0.5 rounded bg-hecate-600/15 text-hecate-300
											hover:bg-hecate-600/25 transition-colors"
									>
										Pick
									</button>
									<button
										onclick={() => openModal(card, 'park')}
										class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
											hover:text-health-warn hover:bg-health-warn/10 transition-colors"
										title="Park card"
									>
										{'\u{23F8}'}
									</button>
									<button
										onclick={() => openModal(card, 'block')}
										class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
											hover:text-health-err hover:bg-health-err/10 transition-colors"
										title="Block card"
									>
										{'\u{26D4}'}
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- PICKED column -->
			<div class="rounded-lg border border-surface-600 bg-surface-800/30">
				<div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-phase-crafting"></span>
					<span class="text-[11px] font-semibold text-surface-200">Picked</span>
					<span class="text-[10px] text-surface-500 ml-auto">{$pickedCards.length}</span>
				</div>
				<div class="p-2 space-y-2">
					{#each $pickedCards as card (card.card_id)}
						<div class="rounded border border-surface-600 bg-surface-800/60 p-2.5 group">
							<div class="flex items-start gap-2 mb-1.5">
								<span class="text-xs font-medium text-surface-100 flex-1 leading-tight">
									{card.title}
								</span>
								<span class="text-[9px] px-1.5 py-0.5 rounded {cardTypeColor(card.card_type)} shrink-0">
									{cardTypeLabel(card.card_type)}
								</span>
							</div>
							{#if card.description}
								<p class="text-[10px] text-surface-400 mb-2 leading-relaxed">{card.description}</p>
							{/if}
							{#if card.picked_by}
								<div class="text-[9px] text-surface-400 mb-2">
									Picked by {card.picked_by}
								</div>
							{/if}
							<div class="flex items-center gap-1 justify-end
								opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onclick={() => openModal(card, 'unpick')}
									class="text-[10px] px-2 py-0.5 rounded text-health-warn
										hover:bg-health-warn/10 transition-colors"
								>
									Unpick
								</button>
								<button
									onclick={() => openModal(card, 'park')}
									class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
										hover:text-health-warn hover:bg-health-warn/10 transition-colors"
									title="Park card"
								>
									{'\u{23F8}'}
								</button>
								<button
									onclick={() => openModal(card, 'block')}
									class="text-[10px] px-1.5 py-0.5 rounded text-surface-400
										hover:text-health-err hover:bg-health-err/10 transition-colors"
									title="Block card"
								>
									{'\u{26D4}'}
								</button>
								<button
									onclick={() => handleFinish(card)}
									class="text-[10px] px-2 py-0.5 rounded bg-health-ok/15 text-health-ok
										hover:bg-health-ok/25 transition-colors"
								>
									Finish
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- FINISHED column -->
			<div class="rounded-lg border border-surface-600 bg-surface-800/30">
				<div class="px-3 py-2 border-b border-surface-600 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-health-ok"></span>
					<span class="text-[11px] font-semibold text-surface-200">Finished</span>
					<span class="text-[10px] text-surface-500 ml-auto">{$finishedCards.length}</span>
				</div>
				<div class="p-2 space-y-2">
					{#each $finishedCards as card (card.card_id)}
						<div class="rounded border border-surface-600/50 bg-surface-800/30 p-2.5 opacity-70">
							<div class="flex items-start gap-2 mb-1">
								<span class="text-[10px] text-health-ok">{'\u{2713}'}</span>
								<span class="text-xs text-surface-300 flex-1 leading-tight">
									{card.title}
								</span>
								<span class="text-[9px] px-1.5 py-0.5 rounded {cardTypeColor(card.card_type)} shrink-0">
									{cardTypeLabel(card.card_type)}
								</span>
							</div>
							<div class="text-[9px] text-surface-500 ml-4">
								{formatTime(card.finished_at)}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Hold lanes (Parked + Blocked) -->
		{#if $parkedCards.length > 0 || $blockedCards.length > 0}
			<div class="grid grid-cols-2 gap-3">
				<!-- PARKED lane -->
				<div class="rounded-lg border border-health-warn/30 bg-health-warn/5">
					<div class="px-3 py-2 border-b border-health-warn/20 flex items-center gap-2">
						<span class="text-[11px]">{'\u{23F8}'}</span>
						<span class="text-[11px] font-semibold text-health-warn">Parked</span>
						<span class="text-[10px] text-surface-500 ml-auto">{$parkedCards.length}</span>
					</div>
					<div class="p-2 space-y-2">
						{#each $parkedCards as card (card.card_id)}
							<div class="rounded border border-health-warn/20 bg-surface-800/60 p-2.5 group">
								<div class="flex items-start gap-2 mb-1">
									<span class="text-xs font-medium text-surface-200 flex-1 leading-tight">
										{card.title}
									</span>
									<span class="text-[9px] px-1.5 py-0.5 rounded {cardTypeColor(card.card_type)} shrink-0">
										{cardTypeLabel(card.card_type)}
									</span>
								</div>
								{#if card.park_reason}
									<p class="text-[10px] text-health-warn/80 mb-2 italic leading-relaxed">
										{card.park_reason}
									</p>
								{/if}
								<div class="flex items-center justify-between">
									<span class="text-[9px] text-surface-500">
										{card.parked_by ? `by ${card.parked_by}` : ''}
										{formatTime(card.parked_at)}
									</span>
									<button
										onclick={() => handleUnpark(card)}
										class="text-[10px] px-2 py-0.5 rounded text-health-warn
											hover:bg-health-warn/15 transition-colors
											opacity-0 group-hover:opacity-100"
									>
										Unpark
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- BLOCKED lane -->
				<div class="rounded-lg border border-health-err/30 bg-health-err/5">
					<div class="px-3 py-2 border-b border-health-err/20 flex items-center gap-2">
						<span class="text-[11px]">{'\u{26D4}'}</span>
						<span class="text-[11px] font-semibold text-health-err">Blocked</span>
						<span class="text-[10px] text-surface-500 ml-auto">{$blockedCards.length}</span>
					</div>
					<div class="p-2 space-y-2">
						{#each $blockedCards as card (card.card_id)}
							<div class="rounded border border-health-err/20 bg-surface-800/60 p-2.5 group">
								<div class="flex items-start gap-2 mb-1">
									<span class="text-xs font-medium text-surface-200 flex-1 leading-tight">
										{card.title}
									</span>
									<span class="text-[9px] px-1.5 py-0.5 rounded {cardTypeColor(card.card_type)} shrink-0">
										{cardTypeLabel(card.card_type)}
									</span>
								</div>
								{#if card.block_reason}
									<p class="text-[10px] text-health-err/80 mb-2 italic leading-relaxed">
										{card.block_reason}
									</p>
								{/if}
								<div class="flex items-center justify-between">
									<span class="text-[9px] text-surface-500">
										{card.blocked_by ? `by ${card.blocked_by}` : ''}
										{formatTime(card.blocked_at)}
									</span>
									<button
										onclick={() => handleUnblock(card)}
										class="text-[10px] px-2 py-0.5 rounded text-health-err
											hover:bg-health-err/15 transition-colors
											opacity-0 group-hover:opacity-100"
									>
										Unblock
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{/if}

	<!-- Reason modal (shared for unpick, park, block) -->
	{#if modalCard}
		{@const ml = modalLabels[modalAction]}
		<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
			role="dialog" aria-modal="true">
			<div class="bg-surface-800 border border-surface-600 rounded-xl p-5 w-96 space-y-3">
				<h4 class="text-sm font-semibold text-surface-100">{ml.title}</h4>
				<p class="text-[11px] text-surface-400">
					{ml.verb}ing <span class="text-surface-200 font-medium">{modalCard.title}</span>
				</p>
				<div>
					<label for="modal-reason" class="text-[10px] text-surface-400 block mb-1">Reason</label>
					<textarea
						id="modal-reason"
						bind:value={modalReason}
						placeholder="Why is this card being {modalAction === 'unpick' ? 'unpicked' : modalAction === 'park' ? 'parked' : 'blocked'}?"
						rows="3"
						class="w-full bg-surface-700 border border-surface-600 rounded px-2.5 py-1.5
							text-xs text-surface-100 placeholder-surface-400
							focus:outline-none focus:border-{ml.color}/50 resize-none"
					></textarea>
				</div>
				<div class="flex gap-2 justify-end">
					<button
						onclick={() => (modalCard = null)}
						class="px-3 py-1.5 rounded text-xs text-surface-400 hover:text-surface-100"
					>
						Cancel
					</button>
					<button
						onclick={handleModalSubmit}
						disabled={!modalReason.trim()}
						class="px-3 py-1.5 rounded text-xs transition-colors
							{modalReason.trim()
							? `bg-${ml.color}/20 text-${ml.color} hover:bg-${ml.color}/30`
							: 'bg-surface-700 text-surface-500 cursor-not-allowed'}"
					>
						{ml.verb}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
