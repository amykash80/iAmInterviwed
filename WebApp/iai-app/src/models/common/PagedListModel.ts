export default interface PagedListModel<T> {
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    items: T[];
}