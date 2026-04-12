type Props = {
  hasMore: boolean;
  offset: number;
  limit: number;
  search?: string;
  status?: string;
  priority?: string;
};

export function Pagination({
  hasMore,
  offset,
  limit,
  search,
  status,
  priority,
}: Props) {
  const build = (newOffset: number) => {
    const params = new URLSearchParams();

    params.set("offset", String(newOffset));

    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (priority) params.set("priority", priority);

    return `?${params.toString()}`;
  };

  return (
    <div className="flex gap-4 mt-6">
      {offset > 0 && (
        <a href={build(offset - limit)} className="border px-3 py-1">
          Prev
        </a>
      )}

      {hasMore && (
        <a href={build(offset + limit)} className="border px-3 py-1">
          Next
        </a>
      )}
    </div>
  );
}
