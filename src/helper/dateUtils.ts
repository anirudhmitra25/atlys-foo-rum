export const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
