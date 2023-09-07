import { makeAutoObservable } from "mobx";
interface MenuItem {
    key: string;
    children?: MenuItem[];
}
class MenuStore {
    menuList: MenuItem[] = [];
    initBool = false;

    constructor() {
        makeAutoObservable(this);
    }

    setMenuList(_menuList: MenuItem[]) {
        this.menuList = _menuList;
        this.initBool = true;
    }

    setInitBool(_initBool: boolean) {
        this.initBool = _initBool;
    }
}

export { MenuStore, MenuItem };
export default new MenuStore();
