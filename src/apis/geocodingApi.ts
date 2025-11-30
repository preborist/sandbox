import http from '@src/lib/http/http';
import * as Types from '@src/types';

class geocodingApi {
  private PATHNAME = '/v1/search';

  getByCityName = async (name: string): Promise<Types.GetByCityNameResponse> => {
    const { data } = await http('geocoding').get(this.PATHNAME, {
      params: { name, count: 1, format: 'json', lang: 'en' },
    });
    return data;
  };
}

export default new geocodingApi();
