import http from '@src/lib/http/http';
import * as Types from '@src/types';

class weatherApi {
  private PATHNAME = '/v1/forecast';

  getByCoordinates = async (props: Types.GetByCoordinatesRequest): Promise<Types.GetByCoordinatesResponse> => {
    const { data } = await http('weather').get(this.PATHNAME, { params: props });
    return data;
  };
}

export default new weatherApi();
