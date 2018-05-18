import rateController from '../../src/controllers/usdmxnController';

let mockIsModelResponseValid = false;

jest.mock('../../src/models/usdmxn', () => ({
  apiQuery(params, cb) {
    if (mockIsModelResponseValid) {
      const docs = [{
        id: 'cool-id',
      }];
      cb(null, docs);
    } else {
      const error = {
        errors: {
          name: {
            message: 'not-cool',
          },
        },
      };
      cb(error);
    }
  },
}));

describe('usdmxnController', () => {
  describe('list', () => {
    describe('when model returns an error', () => {
      it('calls next with the error', () => {
        mockIsModelResponseValid = false;
        const req = {};
        const res = {};
        const next = jest.fn();

        rateController.list(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0].message).toBe('not-cool');
      });
    });

    describe('when modal returns valid response', () => {
      it('calls send passing response', () => {
        mockIsModelResponseValid = true;
        const req = {};
        const res = {
          send: jest.fn(),
        };
        const next = jest.fn();

        rateController.list(req, res, next);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toBeCalledWith([{
          id: 'cool-id',
        }]);
      });
    });
  });

  describe('save', () => {
    describe('when is not a JSON request', () => {
      it('calls next with an error', () => {
        const req = {
          is: jest.fn(() => false),
        };
        const res = {};
        const next = jest.fn();

        rateController.save(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0].message).toBe("Expects 'application/json'");
      });
    });

    describe('when data is falsy', () => {
      it('calls next with an error', () => {
        const req = {
          is: jest.fn(() => true),
          body: {},
        };
        const res = {
          send: jest.fn(),
        };
        const next = jest.fn();

        rateController.save(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0].message).toBe('no data sent');
      });
    });

    describe('when data is passed', () => {
      beforeEach(() => {
        global.Array.prototype.map = jest.fn(() => ['happy-promise']);
      });

      afterEach(() => {
        global.Array.prototype.map.mockRestore();
      });

      it('returns valid response', async () => {
        const req = {
          is: jest.fn(() => true),
          body: {
            data: [{}],
          },
        };
        const res = {
          send: jest.fn(),
        };
        const next = jest.fn();

        await rateController.save(req, res, next);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(['happy-promise']);
      });
    });
  });
});
