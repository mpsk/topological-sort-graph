'use strict';

import {useStrict} from 'mobx';
import AppStore from './AppStore';
import LinksStore from './LinksStore';

useStrict(true);

export {
	initStores,
	AppStore,
	LinksStore
}

export interface Stores {
	app: AppStore;
	linksStore: LinksStore;
}

function initStores(): Stores {
	return {
		app: new AppStore(),
		linksStore: new LinksStore()
	}
}