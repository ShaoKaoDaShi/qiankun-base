import { makeAutoObservable } from "mobx";
class MenuStore {
    menuList: string[] = [];
    initBool = false;

    constructor() {
        makeAutoObservable(this);
    }

    setMenuList(_menuList: string[]) {
        this.menuList = _menuList;
        this.initBool = true;
    }

    setInitBool(_initBool: boolean) {
        this.initBool = _initBool;
    }
}

export { MenuStore };
export default new MenuStore();
