"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    var _this = this;
    var api = this.api;
    api.ipcMain.on('openHyperMenu', function (e, data) {
        var _a, _b, _c, _d, _e, _f;
        if (!((_a = api.windows) === null || _a === void 0 ? void 0 : _a.hypermenu)) {
            api.windows['hypermenu'] = new api.browserWindow({
                width: 200,
                height: 200,
                x: 0,
                y: 0,
                frame: false,
                thickFrame: false,
                resizable: false,
                skipTaskbar: true,
                focusable: true,
                fullscreenable: false,
                show: true,
                minimizable: false,
                alwaysOnTop: true,
                transparent: true,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                }
            });
            (_b = api.windows) === null || _b === void 0 ? void 0 : _b.hypermenu.loadURL('widgets://hypermenu/assets/menu.html');
            (_c = api.windows) === null || _c === void 0 ? void 0 : _c.hypermenu.on('close', function () {
                var _a;
                (_a = api.windows) === null || _a === void 0 ? true : delete _a.hypermenu;
            });
            (_d = api.windows) === null || _d === void 0 ? void 0 : _d.hypermenu.on('blur', function () {
                setTimeout(function () {
                    var _a, _b, _c;
                    (_b = (_a = api.windows) === null || _a === void 0 ? void 0 : _a.hypermenu) === null || _b === void 0 ? void 0 : _b.close();
                    (_c = api.windows) === null || _c === void 0 ? true : delete _c.hypermenu;
                }, 100);
            });
            api.ipcMain.emit('getScreenSize');
        }
        else {
            (_e = api.windows) === null || _e === void 0 ? void 0 : _e.hypermenu.close();
            (_f = api.windows) === null || _f === void 0 ? true : delete _f.hypermenu;
        }
    });
    api.ipcMain.on('sendScreenSize', function (size) {
        var _a;
        if (!api.windows.hypermenu) {
            return;
        }
        var w = size.w, h = size.h;
        // TODO: Make it open on mouse X?
        console.log("Calculated menu size:", h, api.windows.hypermenu.getContentSize());
        (_a = api.windows) === null || _a === void 0 ? void 0 : _a.hypermenu.setPosition(_this.config.getValue('widgets', 'hyper_menu', 'xpos'), _this.config.getValue('general', 'position', 'dock-pos') === "top"
            ? _this.config.getValue('appearence', 'sizes', 'height') + _this.config.getValue('general', 'position', 'vertical-margin')
            : h - _this.config.getValue('general', 'position', 'vertical-margin') - (12 * 2) - (11 * 2) - (_this.config.getValue('general', 'position', 'vertical-margin') * 2) - _this.config.getValue('appearence', 'sizes', 'height') - api.windows.hypermenu.getContentSize()[1] - 9
        // 11: electron frame * top, bottom
        // 12: padding not calculated by function * top, bottom
        // 9: hypermenu margin from bar
        // vertical margin * 2
        // bar size
        // screen size
        // menu size
        );
    });
    api.ipcMain.on('resizeHypermenu', function (e, size) {
        var _a;
        var w = size.w, h = size.h;
        console.log("Processed size", w, h);
        if (!((_a = api.windows) === null || _a === void 0 ? void 0 : _a.hypermenu)) {
            return;
        }
        api.windows.hypermenu.setSize(w, h);
    });
    api.ipcMain.on('openDirectory', function (e, directory) {
        _this.api.shell.openPath(directory);
    });
}
exports.default = default_1;
