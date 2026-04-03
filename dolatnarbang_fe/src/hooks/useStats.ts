import { useQuery } from '@tanstack/react-query';
import { getStats } from '../api/user';

// 통계는 ~10분 캐시. staleTime을 맞춰 불필요한 재요청 방지
export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    staleTime: 10 * 60 * 1000, // 600초
  });
};
