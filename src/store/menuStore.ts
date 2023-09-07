import { makeAutoObservable } from "mobx";
interface MenuItem {
    key: string;
    children?: MenuItem[];
}
class MenuStore {
    menuList: MenuItem[] = [];
    initBool = false;
    userMenuList: MenuItem[] = [];
    userInitBool = false;

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

    getMenuList() {
        return this.menuList;
    }

    setUserMenuList(userMenuList: MenuItem[]) {
        this.userMenuList = userMenuList;
        this.userInitBool = true;
    }
}

export { MenuStore, MenuItem };
export default new MenuStore();
