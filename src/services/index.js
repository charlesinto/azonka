class App {
  static santizePayload(payload = {}) {
    const newPayload = {};
    console.log("old payload: ", payload);
    Object.keys(payload).forEach((key) => {
      if (payload[key]) {
        if (typeof payload[key] === "string") {
          newPayload[key] = payload[key];
        } else {
          newPayload[key] = payload[key];
        }
      }
    });
    console.log("new payload: ", newPayload);
    return newPayload;
  }
}

export default App;
