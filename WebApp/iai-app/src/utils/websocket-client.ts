import storageHelper from "./client-storage";
import AppConfig from "../config";

class WebSocketClient {
    static getInstance(url: any, messageHandler: any, connectionHandler: any, closeHandler: any, errorHandler: any) {
        const userToken = storageHelper.getItem(
            AppConfig.account.userTokenHeader
        );

        const ws = new WebSocket("wss" + url, ["x-auth-token", encodeURIComponent(userToken!)]);
        ws.onopen = event => {
            connectionHandler(ws, event);
        }
        ws.onmessage = event => {
            messageHandler(ws, event);
        }
        ws.onclose = event => {
            closeHandler(ws, event);
        }
        ws.onerror = event => {
            errorHandler(ws, event);
        }
        return ws;
    }
}
export default WebSocketClient;