/**
 * 各个子系统的store需要注册到全局store
 */

export async function registerStore(storeURL, globalStore) {
  let storeModule = {},
    customerProp = { globalStore };
  try {
    storeModule = storeURL ? await SystemJS.import(storeURL) : { storeInstance: null };
    console.log(storeModule);
  } catch (e) {
    console.log("cann't load the store, the reason is:" + e);
  }
  if (storeModule.storeInstance && globalStore) {
    let store = storeModule.storeInstance;
    customerProp.store = store;
    globalStore.register(store);
  }
  return {
    customerProp
  };
}
