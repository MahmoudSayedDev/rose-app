import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"

export type OccasionsList = MainResponse<OccasionsListPayload>;

export interface OccasionsListPayload {
  data: Occasion[];
  metadata: Metadata;
}

export interface Occasion {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}