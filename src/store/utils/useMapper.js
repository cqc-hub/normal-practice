import { computed } from 'vue';
import { useStore } from 'vuex';

export const useMapper = function(map, mapFn) {
    const store = useStore();
    const mapStateValue = {};
    const mapStateGetFns = mapFn(map);

    Object.keys(mapStateGetFns).map(key => {
        const value = mapStateGetFns[key].bind({ $store: store });
        mapStateValue[key] = computed(value);
    })


    return mapStateValue;
}