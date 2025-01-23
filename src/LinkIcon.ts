import globeIcon from 'bootstrap-icons/icons/link-45deg.svg';
import {
	getRemoteUrl,
	LINK_ICON_CLASS_NAME,
	FALLBACK_ICON_CLASS_NAME,
	GOOGLE_FAVICON_API
} from './utils';

export class LinkIcon {
	constructor(private readonly href: string, private readonly containerEl: HTMLElement) {
		this.pageUrl = getRemoteUrl(this.href);

		try {
			this.origin = new URL(this.pageUrl).origin;
		} catch {
			this.origin = '';
		}

		this.iconEl = this.createIconEl();
		this.loadIcon();
	}

	private iconEl: HTMLSpanElement;
	private readonly pageUrl: string;
	private iconUrl?: string;
	private readonly origin: string;

	private createIconEl() {
		let className = LINK_ICON_CLASS_NAME;
		const iconEl = this.containerEl.querySelector(`.${className}`);

		if (iconEl) {
			iconEl.remove();
		}

		const el = document.createElement('span');

		el.innerHTML = globeIcon;
		el.classList.add(className);
		this.containerEl.prepend(el);

		return el;
	}

	private setIconUrl(src: string) {
		const imgEl = document.createElement('img');
		imgEl.src = src;
		imgEl.onerror = () => {
			this.iconEl.classList.replace(LINK_ICON_CLASS_NAME, FALLBACK_ICON_CLASS_NAME);
			this.iconEl.innerHTML = globeIcon;
		};

		this.iconEl.innerHTML = imgEl.outerHTML;
		this.iconUrl = src;
	}

	private async loadIcon() {
		if (!this.origin) {
			return;
		}

		let iconUrl = `${GOOGLE_FAVICON_API}${this.pageUrl}`;
		this.setIconUrl(iconUrl);

		return;
	}

	destroy() {
		if (this.iconUrl) {
			URL.revokeObjectURL(this.iconUrl);
		}
	}
}
