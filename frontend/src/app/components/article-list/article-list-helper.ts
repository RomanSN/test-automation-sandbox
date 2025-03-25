import { SortState } from "../../../../typing";
import { LOCAL_STORAGE_ITEMS } from "../../data/local-storage-items.enum";

export const articlesHelper = {
  compareValues(a: any, b: any, order: 'asc' | 'desc'): number {
    const valueA = typeof a === 'string' ? a.toLowerCase() : a;
    const valueB = typeof b === 'string' ? b.toLowerCase() : b;

    const comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;

    return order === 'asc' ? comparison : -comparison;
  },

  saveSortState(sortState: SortState): void {
    localStorage.setItem(LOCAL_STORAGE_ITEMS.sortState, JSON.stringify(sortState));
  }
};
