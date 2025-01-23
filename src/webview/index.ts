import EventEmitter from 'eventemitter3';
import { IconBuilder } from './IconBuilder';
import {
	Note,
	MarkdownViewEvents,
	MARKDOWN_SCRIPT_ID,
	QueryCurrentNoteRequest
} from '../utils';


declare const webviewApi: {
	postMessage: <T>(
		id: string,
		payload: QueryCurrentNoteRequest,
	) => Promise<T>;
};

export class MarkdownView extends EventEmitter<MarkdownViewEvents> {
	// `this class will be instantiated when :
	// 1. start App(including return from setting panel)
	// 2. switch to note in another notebook
	constructor() {
		super();
		new IconBuilder(this);
	}

	ready = this.init();
	currentNoteId?: string;
	private async init() {
		const note = await webviewApi.postMessage<Note>(MARKDOWN_SCRIPT_ID, {
			event: 'queryCurrentNote',
		});
		this.currentNoteId = note.id;
		let currentNoteIdTimes = 1;
		let timer: ReturnType<typeof setTimeout>;

		this.emit(MarkdownViewEvents.NewNoteOpen);
		this.emit(MarkdownViewEvents.NoteDidUpdate, note);

		// this event doesn't fire on app start
		document.addEventListener('joplin-noteDidUpdate', async () => {
			timer && clearTimeout(timer);

			const currentNote = await webviewApi.postMessage<Note>(MARKDOWN_SCRIPT_ID, {
				event: 'queryCurrentNote',
			});

			if (currentNote.id === this.currentNoteId) {
				currentNoteIdTimes++;

				// hack: joplin-noteDidUpdate fires twice when switch to another note
				if (currentNoteIdTimes >= 2) {
					if (currentNoteIdTimes === 2) {
						this.emit(MarkdownViewEvents.NewNoteOpen);
					}

					this.emit(MarkdownViewEvents.NoteDidUpdate, currentNote);
				}
			} else {
				timer && clearTimeout(timer);
				this.currentNoteId = currentNote.id;
				currentNoteIdTimes = 1;

				// hack: don't know why sometimes joplin-noteDidUpdate just fire once when switching note.
				// use timer to make sure it fire
				timer = setTimeout(() => {
					this.emit(MarkdownViewEvents.NewNoteOpen);
					this.emit(MarkdownViewEvents.NoteDidUpdate, currentNote);
				}, 2000);
			}
		});
	}
}

new MarkdownView();
