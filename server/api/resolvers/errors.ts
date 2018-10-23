import { createError } from 'apollo-errors';

const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred'
});

const NotFoundError = createError('NotFoundError', {
  message: 'The requested query is not found'
});

export {
  UnknownError,
  NotFoundError
}
