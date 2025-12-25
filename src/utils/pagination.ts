export function paginate(page: string = "1", limit: string = "10") {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  return { skip, limit: limitNumber };
}
