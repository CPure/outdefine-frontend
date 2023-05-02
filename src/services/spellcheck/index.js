import { api } from '../axios';


export const getSpellcheck = async (word) => {
  const response = await api.get(`/api/spellcheck/${word}`);

  return response.data;
}

export default {
    getSpellcheck,
}
