const z = require('zod')
const genres = require('../genres.json')

const currentYear = new Date().getFullYear()

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  year: z.number().int().min(1900).max(currentYear,
    { message: `Year must be between 1900 and the current year (${currentYear})` }),
  director: z.string(),
  duration: z.number().positive({ message: 'Duration must be greater than 0' }),
  poster: z.string().url({ message: 'Poster must be a valid URL' }),
  genre: z.array(
    z.enum(genres),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of strings'
    }
  ),
  rate: z.number().min(0).max(10).default(5)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
