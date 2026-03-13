export interface ResultsState<T> {
    isLoading: boolean;
    data: T[];
    status: 'inactive' | 'active';
    error: string | null;
}