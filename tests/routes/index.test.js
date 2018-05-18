import routes from '../../src/routes';

describe('routes', () => {
  it('makes expected calls', () => {
    const server = {
      get: jest.fn(),
      post: jest.fn(),
    };

    routes(server);

    expect(server.get.mock.calls).toMatchSnapshot();

    expect(server.post.mock.calls).toMatchSnapshot();
  });
});
