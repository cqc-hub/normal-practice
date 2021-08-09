import { 
  ref,
  watch 
} from 'vue';

export const getLocal = function(key) {
  return JSON.parse(localStorage.getItem(key))
}


export const setLocal = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


export const userLocalStorage = function(key, value) {
  const data = ref(value);

  if(value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    data.value = JSON.parse(localStorage.getItem(key))
  }
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  })
  return data;
}