import debounce from 'lodash.debounce';
import { LinkIcon } from '../LinkIcon';
import type { MarkdownView } from './index';
import { ROOT_ELEMENT_ID, MarkdownViewEvents } from '../utils';


export class IconBuilder {
	constructor(private readonly view: MarkdownView) { }

	private readonly ready = this.init();
	private icons: LinkIcon[] = [];

	private async init() {
		const attach = debounce(this.attach.bind(this), 500);

		this.view.on(MarkdownViewEvents.NoteDidUpdate, attach);
	}

	private async attach() {
		await this.ready;

		this.icons.forEach((icon) => icon.destroy());

		const rootEl = document.getElementById(ROOT_ELEMENT_ID)!;
		const linkEls = [...rootEl.querySelectorAll('a[href]:not([href^="#"])')] as HTMLAnchorElement[];
		const icons = [];

		for (const el of linkEls) {
			const href = el.getAttribute('href')!;
			icons.push(new LinkIcon(href, el));
		}

		this.icons = icons;
	}
}
