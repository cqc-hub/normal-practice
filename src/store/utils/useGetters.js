import { mapGetters, createNamespacedHelpers } from 'vuex';
import { useMapper } from './useMapper';

export const useMapGetters = (moduleName, map) => {
  let mapFn = mapGetters;
  const nameType = typeof moduleName === 'string';

  if (nameType && moduleName) {
    mapFn = createNamespacedHelpers(moduleName).mapGetters
  }


  return useMapper(map || moduleName, mapFn)
};
// map => useMapper(map, mapGetters)


