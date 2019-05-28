export interface CreateRepoPayload {
  name: string;
  description: string;
  logo?: string;
  members: number[];
}
