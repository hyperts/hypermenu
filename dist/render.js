"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var react_1 = __importDefault(require("../../../modules/react"));
function MenuComponent(_a) {
    var config = _a.config, ipcRenderer = _a.ipcRenderer;
    var avatarURL = config.getValue('widgets', 'hyper_menu', 'imageurl');
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "hypermenu wrapper", onClick: function (e) {
                var target = e.target;
                var bounds = target.getBoundingClientRect();
                console.log("Sending open hyper menu");
                ipcRenderer.send('openHyperMenu', { x: target.offsetLeft, y: bounds.y, w: bounds.width, h: bounds.height });
            }, onContextMenu: function () {
                console.log("Context menu");
            } },
            react_1.default.createElement("div", { onContextMenu: function () {
                    console.log("Context menu");
                }, className: "hypermenu display", style: {
                    backgroundImage: avatarURL === "" ? "url(assets://logo.svg)" : "url(".concat(avatarURL, ")"),
                    backgroundSize: avatarURL === "" ? "calc(var(--barsize) - var(--padding) - 1)" : 'cover'
                } }),
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "hypermenu icondown" },
                react_1.default.createElement("polyline", { points: "6 9 12 15 18 9" }))));
}
exports.styles = ['style/index.css'];
function default_1() {
    return react_1.default.createElement(MenuComponent
    //@ts-expect-error
    , { 
        //@ts-expect-error
        key: 'hyper-menu', config: this.config, ipcRenderer: this.api.ipcRenderer });
}
exports.default = default_1;
