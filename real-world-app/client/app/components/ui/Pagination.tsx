type Props = {
  hasMore: boolean;
  offset: number;
  limit: number;
};

export function Pagination({ hasMore, offset, limit }: Props) {
  return (
    <div className="flex justify-between mt-6">
      {offset > 0 && (
        <a
          href={`?offset=${offset - limit}`}
          className="px-4 py-2 border rounded"
        >
          Prev
        </a>
      )}

      {hasMore && (
        <a
          href={`?offset=${offset + limit}`}
          className="px-4 py-2 border rounded"
        >
          Next
        </a>
      )}
    </div>
  );
}
