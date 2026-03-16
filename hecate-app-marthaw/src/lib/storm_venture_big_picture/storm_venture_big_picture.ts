import { writable, derived, get } from 'svelte/store';
import { getApi } from '../shared/api.js';
import { divisions } from '../guide_venture/guide_venture.js';

// --- Types ---
export type BigPicturePhase = 'ready' | 'meditate' | 'storm' | 'stack' | 'groom' | 'cluster' | 'name' | 'arrow' | 'map' | 'promote' | 'promoted' | 'shelved' | 'archived';

export interface BigPictureEvent {
	sticky_id: string;
	text: string;
	author: string;
	cluster_id: string | null;
	stack_id: string | null;
	position: number;
	weight: number;
}

export interface EventCluster {
	cluster_id: string;
	name: string | null;
	status: string;
	color?: string;
}

export interface FactArrow {
	arrow_id: string;
	from_cluster: string;
	to_cluster: string;
	fact_name: string;
}

export interface StormState {
	phase: BigPicturePhase;
	stickies: BigPictureEvent[];
	clusters: EventCluster[];
	arrows: FactArrow[];
}

export type StormRole = 'domain_expert' | 'boundary_spotter' | 'security_expert' | 'ux_expert';

export interface StormParticipant {
	participant_id: string;
	role: StormRole;
	custom_instructions?: string;
	registered_at?: number;
}

export type FindingType = 'domain_concept' | 'business_rule' | 'industry_pattern' | 'risk' | 'terminology' | 'prior_art';

export interface MeditationFinding {
	participant_id: string;
	finding_type: FindingType;
	content: string;
	sources: { url: string; title: string; snippet: string }[];
	contributed_at?: number;
}

export type MeditationStatus = 'idle' | 'searching' | 'reading' | 'synthesizing' | 'done';

export interface ParticipantProgress {
	participant_id: string;
	status: MeditationStatus;
	findings_count: number;
}

export interface RawEvent {
	event_id: string;
	event_type: string;
	stream_id: string;
	version: number;
	timestamp: string;
	data: Record<string, unknown>;
}

// --- State ---
export const bigPicturePhase = writable<BigPicturePhase>('ready');
export const bigPictureEvents = writable<BigPictureEvent[]>([]);
export const eventClusters = writable<EventCluster[]>([]);
export const factArrows = writable<FactArrow[]>([]);
export const highOctaneRemaining = writable<number>(600);
export const ventureRawEvents = writable<RawEvent[]>([]);
export const showEventStream = writable<boolean>(false);
export const stormError = writable<string | null>(null);
export const isLoading = writable(false);
let highOctaneTimer: ReturnType<typeof setInterval> | null = null;

// --- Meditation State ---
export const stormParticipants = writable<StormParticipant[]>([]);
export const meditationFindings = writable<MeditationFinding[]>([]);
export const meditationRemaining = writable<number>(300); // 5 minutes
export const participantProgress = writable<ParticipantProgress[]>([]);
let meditationTimer: ReturnType<typeof setInterval> | null = null;

// --- Derived ---
export const unclusteredEvents = derived(
	bigPictureEvents,
	($events) => $events.filter((e) => !e.cluster_id)
);

export const stickyStacks = derived(
	bigPictureEvents,
	($events) => {
		const stacks = new Map<string, BigPictureEvent[]>();
		for (const e of $events) {
			if (e.stack_id) {
				const existing = stacks.get(e.stack_id) || [];
				existing.push(e);
				stacks.set(e.stack_id, existing);
			}
		}
		return stacks;
	}
);

export const bigPictureEventCount = derived(
	bigPictureEvents,
	($events) => $events.length
);

// --- Actions ---
export async function fetchStormState(ventureId: string): Promise<void> {
	try {
		const api = getApi();
		const resp = await api.get<{
			storm: StormState & {
				participants?: StormParticipant[];
				meditation_findings?: MeditationFinding[];
				participant_progress?: ParticipantProgress[];
			};
		}>(`/get_storm_state/${ventureId}`);
		const s = resp.storm;
		bigPicturePhase.set(s.phase);
		bigPictureEvents.set(s.stickies);
		eventClusters.set(s.clusters);
		factArrows.set(s.arrows);
		if (s.participants) stormParticipants.set(s.participants);
		if (s.meditation_findings) meditationFindings.set(s.meditation_findings);
		if (s.participant_progress) participantProgress.set(s.participant_progress);
	} catch {
		bigPicturePhase.set('ready');
	}
}

export async function fetchVentureEvents(
	ventureId: string,
	offset = 0,
	limit = 50
): Promise<{ events: RawEvent[]; count: number }> {
	try {
		const api = getApi();
		const resp = await api.get<{ events: RawEvent[]; count: number }>(
			`/get_venture_events_page/${ventureId}?offset=${offset}&limit=${limit}`
		);
		ventureRawEvents.set(resp.events);
		return { events: resp.events, count: resp.count };
	} catch {
		return { events: [], count: 0 };
	}
}

export async function startBigPictureStorm(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/start_big_picture_storm/${ventureId}`, {});
		bigPicturePhase.set('storm');
		highOctaneRemaining.set(600);
		highOctaneTimer = setInterval(() => {
			highOctaneRemaining.update((t) => {
				if (t <= 1) {
					if (highOctaneTimer) {
						clearInterval(highOctaneTimer);
						highOctaneTimer = null;
					}
					return 0;
				}
				return t - 1;
			});
		}, 1000);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to start storm');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function postEventSticky(
	ventureId: string,
	text: string,
	author = 'user'
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/post_event_sticky/${ventureId}`, { text, author });
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to post sticky');
		return false;
	}
}

export async function pullEventSticky(
	ventureId: string,
	stickyId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/pull_event_sticky/${ventureId}/${stickyId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to pull sticky');
		return false;
	}
}

export async function stackEventSticky(
	ventureId: string,
	stickyId: string,
	targetStickyId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/stack_event_sticky/${ventureId}/${stickyId}`, {
			target_sticky_id: targetStickyId
		});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to stack sticky');
		return false;
	}
}

export async function unstackEventSticky(
	ventureId: string,
	stickyId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/unstack_event_sticky/${ventureId}/${stickyId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to unstack sticky');
		return false;
	}
}

export async function groomEventStack(
	ventureId: string,
	stackId: string,
	canonicalStickyId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/groom_event_stack/${ventureId}/${stackId}`, {
			canonical_sticky_id: canonicalStickyId
		});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to groom stack');
		return false;
	}
}

export async function clusterEventSticky(
	ventureId: string,
	stickyId: string,
	targetClusterId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/cluster_event_sticky/${ventureId}/${stickyId}`, {
			target_cluster_id: targetClusterId
		});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to cluster sticky');
		return false;
	}
}

export async function unclusterEventSticky(
	ventureId: string,
	stickyId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/uncluster_event_sticky/${ventureId}/${stickyId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to uncluster sticky');
		return false;
	}
}

export async function dissolveEventCluster(
	ventureId: string,
	clusterId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/dissolve_event_cluster/${ventureId}/${clusterId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to dissolve cluster');
		return false;
	}
}

export async function nameEventCluster(
	ventureId: string,
	clusterId: string,
	name: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/name_event_cluster/${ventureId}/${clusterId}`, { name });
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to name cluster');
		return false;
	}
}

export async function drawFactArrow(
	ventureId: string,
	fromCluster: string,
	toCluster: string,
	factName: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/draw_fact_arrow/${ventureId}`, {
			from_cluster: fromCluster,
			to_cluster: toCluster,
			fact_name: factName
		});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to draw fact arrow');
		return false;
	}
}

export async function eraseFactArrow(
	ventureId: string,
	arrowId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/erase_fact_arrow/${ventureId}/${arrowId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to erase fact arrow');
		return false;
	}
}

export async function promoteEventCluster(
	ventureId: string,
	clusterId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/promote_event_cluster/${ventureId}/${clusterId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to promote cluster');
		return false;
	}
}

export async function advanceStormPhase(
	ventureId: string,
	nextPhase: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/advance_storm_phase/${ventureId}`, {
			target_phase: nextPhase
		});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to advance phase');
		return false;
	}
}

export async function shelveStorm(ventureId: string): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/shelve_big_picture_storm/${ventureId}`, {});
		bigPicturePhase.set('shelved');
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to shelve storm');
		return false;
	}
}

export async function resumeStorm(ventureId: string): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/resume_big_picture_storm/${ventureId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to resume storm');
		return false;
	}
}

export async function archiveStorm(ventureId: string): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(`/archive_big_picture_storm/${ventureId}`, {});
		await fetchStormState(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to archive storm');
		return false;
	}
}

export async function promoteAllClusters(ventureId: string): Promise<boolean> {
	const clusters = get(eventClusters);
	let allOk = true;
	for (const cluster of clusters) {
		if (cluster.status !== 'active' || !cluster.name?.trim()) continue;
		const ok = await promoteEventCluster(ventureId, cluster.cluster_id);
		if (!ok) allOk = false;
	}
	if (allOk) {
		const { fetchDivisions } = await import('../guide_venture/guide_venture.js');
		await fetchDivisions(ventureId);
	}
	return allOk;
}

// --- Meditation Actions ---

export async function registerStormParticipant(
	ventureId: string,
	role: StormRole,
	customInstructions?: string
): Promise<boolean> {
	try {
		const api = getApi();
		const participantId = crypto.randomUUID();
		await api.post(`/register_storm_participant/${ventureId}`, {
			participant_id: participantId,
			role,
			custom_instructions: customInstructions ?? ''
		});
		stormParticipants.update((ps) => [
			...ps,
			{ participant_id: participantId, role, custom_instructions: customInstructions }
		]);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to register participant');
		return false;
	}
}

export async function unregisterStormParticipant(
	ventureId: string,
	participantId: string
): Promise<boolean> {
	try {
		const api = getApi();
		await api.post(
			`/unregister_storm_participant/${ventureId}/${participantId}`,
			{}
		);
		stormParticipants.update((ps) =>
			ps.filter((p) => p.participant_id !== participantId)
		);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to unregister participant');
		return false;
	}
}

export async function startDomainMeditation(ventureId: string): Promise<boolean> {
	try {
		isLoading.set(true);
		const api = getApi();
		await api.post(`/start_domain_meditation/${ventureId}`, {});
		bigPicturePhase.set('meditate');
		meditationRemaining.set(300);
		meditationFindings.set([]);
		participantProgress.update((pp) =>
			get(stormParticipants).map((p) => ({
				participant_id: p.participant_id,
				status: 'searching' as MeditationStatus,
				findings_count: 0
			}))
		);
		meditationTimer = setInterval(() => {
			meditationRemaining.update((t) => {
				if (t <= 1) {
					if (meditationTimer) {
						clearInterval(meditationTimer);
						meditationTimer = null;
					}
					completeDomainMeditation(ventureId);
					return 0;
				}
				return t - 1;
			});
		}, 1000);
		startMeditationPolling(ventureId);
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to start meditation');
		return false;
	} finally {
		isLoading.set(false);
	}
}

export async function completeDomainMeditation(ventureId: string): Promise<boolean> {
	try {
		if (meditationTimer) {
			clearInterval(meditationTimer);
			meditationTimer = null;
		}
		stopMeditationPolling();
		const api = getApi();
		await api.post(`/complete_domain_meditation/${ventureId}`, {});
		bigPicturePhase.set('ready');
		return true;
	} catch (e: unknown) {
		const err = e as { message?: string };
		stormError.set(err.message || 'Failed to complete meditation');
		return false;
	}
}

// Polling for meditation progress + findings
let meditationPollTimer: ReturnType<typeof setInterval> | null = null;

function startMeditationPolling(ventureId: string): void {
	stopMeditationPolling();
	meditationPollTimer = setInterval(async () => {
		try {
			await fetchStormState(ventureId);
		} catch {
			// Silently continue polling
		}
	}, 3000);
}

function stopMeditationPolling(): void {
	if (meditationPollTimer) {
		clearInterval(meditationPollTimer);
		meditationPollTimer = null;
	}
}

export function resetBigPicture(): void {
	if (highOctaneTimer) {
		clearInterval(highOctaneTimer);
		highOctaneTimer = null;
	}
	if (meditationTimer) {
		clearInterval(meditationTimer);
		meditationTimer = null;
	}
	stopMeditationPolling();
	bigPicturePhase.set('ready');
	bigPictureEvents.set([]);
	eventClusters.set([]);
	factArrows.set([]);
	ventureRawEvents.set([]);
	highOctaneRemaining.set(600);
	stormParticipants.set([]);
	meditationFindings.set([]);
	meditationRemaining.set(300);
	participantProgress.set([]);
}
