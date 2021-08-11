import { mapState, createNamespacedHelpers } from 'vuex';
import { useMapper } from './useMapper';

export const useMapState = (moduleName, map) => {
  let mapFn = mapState;
  const nameType = typeof moduleName === 'string';
  if (nameType && moduleName) {
    mapFn = createNamespacedHelpers(moduleName).mapState;
  }


  return useMapper(map || moduleName, mapFn);
};

