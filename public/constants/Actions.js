class Actions {
  TCP_CLIENT = {
    CONNECT: "tcp_client_connect",
    CONNECT_ERROR: "tcp_client_connect_error",
    DISCONNECT: "tcp_client_disconnect",
    DISCONNECTED: "tcp_client_disconnected",
    CONNECTED: "tcp_client_connected",
    SEND: "tcp_client_send",
    RECEIVE: "tcp_client_receive",
  };

  ELECTRON = {
    FINISH_LOAD: "did-finish-load",
  };
}

module.exports = { Actions: Actions };
