import { Pagination } from "../api/models";

export interface EntityList<Entity> {
  entities: Entity[];
  loading?: boolean;
  pagination?: Pagination;
}
