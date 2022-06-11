function load(key) {
    var val = localStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function store(key, val) {
    localStorage[key] = JSON.stringify(val);
}

function loadFromSession(key){
    var val = sessionStorage.getItem(key)
    return (val)? JSON.parse(val): null;
}

function storeToSession(key, val){
    sessionStorage[key] = JSON.stringify(val);
}


export const syncStorageService = {
    load,
    store,
    loadFromSession,
    storeToSession

}