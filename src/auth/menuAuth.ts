import menuStore from "../store/menuStore";
function containTreeItem(pathArr: string[], tree = []) {
    if (pathArr.length === 0) return true;
    const pathItem = pathArr.shift();
    for (let i = 0; i < tree.length; i++) {
        if (pathItem.includes(tree[i].key)) {
            return containTreeItem(pathArr, tree[i].children);
        }
    }
    return false;
}
function menuAuth() {
    const pathArr = location.pathname.split("/");
    pathArr.shift();
    if (
        location.pathname !== "/home" &&
        !containTreeItem(pathArr, menuStore.menuList)
    ) {
        return false;
    }
    return true;
}
export default menuAuth;
